const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const router = require('./routes/index')

mongoose.connect(process.env.MONGOOSE_URL)
.then(() => {
    console.log('Connect to MonDu successfully!');
})
.catch(() => {
    console.log('Connect to MonDu failed!');
});

app.use(cors({
    credentials: true,
    origin: '*'
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

router(app);

app.listen(process.env.PORT || 4001);