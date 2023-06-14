const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const Notification = require('./controllers/notificationController')

app.use(cors({
    credentials: true,
    origin: '*'
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGOOSE_URL)
    .then(() => {
        console.log('Connect to MonDu successfully!');
        io.on('connection', (socket) => {
            console.log(`Socket ${socket.id} connected`);

            socket.on('post-notification', (data) => {
                Notification.addNotification(data, io);
            });
        
            socket.on('sendMessage', (message) => {
                io.emit('message', message);
            });
        
            socket.on('disconnect', () => {
                console.log(`Socket ${socket.id} disconnected`);
            });
        });
    })
    .catch((err) => {
        console.log(err);
});

router(app);

server.listen(process.env.PORT || 4001, () => {
    console.log('listening on *:4001');
});