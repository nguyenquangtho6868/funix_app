import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemIcon } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button';
import TelegramIcon from '@mui/icons-material/Telegram';
import OutlinedInput from '@mui/material/OutlinedInput';
import './chatRoom.css';
import { useNavigate } from 'react-router-dom';


const userId = localStorage.getItem('userId');

const conversations = [
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Hi', 'Chơi liên minh khônggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Chơi luôn', 'Ông rank j rồi?', 'Ông rank j rồi?'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Kim cương 4', 'Chú đủ tuổi chơi không?', 'Chú đủ tuổi chơi không?', 'Chú đủ tuổi chơi không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Solo luôn', 'Sợ cái gì, let go!'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Hi', 'Chơi liên minh không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Chơi luôn', 'Ông rank j rồi?'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Kim cương 4', 'Chú đủ tuổi chơi không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Solo luôn', 'Sợ cái gì, let go!'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Hi', 'Chơi liên minh không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Chơi luôn', 'Ông rank j rồi?'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Kim cương 4', 'Chú đủ tuổi chơi không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Solo luôn', 'Sợ cái gì, let go!'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Hi', 'Chơi liên minh không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Chơi luôn', 'Ông rank j rồi?'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Kim cương 4', 'Chú đủ tuổi chơi không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Solo luôn', 'Sợ cái gì, let go!'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Hi', 'Chơi liên minh không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Chơi luôn', 'Ông rank j rồi?'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Kim cương 4', 'Chú đủ tuổi chơi không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Solo luôn', 'Sợ cái gì, let go!'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Hi', 'Chơi liên minh không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Chơi luôn', 'Ông rank j rồi?'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Kim cương 4', 'Chú đủ tuổi chơi không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Solo luôn', 'Sợ cái gì, let go!'],
        date: Date.now(),
    },
];


function ChatRoomComponent() {

    const navigate = useNavigate();
    const [valueMessage, setValueMessage] = useState();

    const endConversation = () => {
        navigate('/home')
    }

    const sendMessage = () => {

    }
    return (
        <Grid container className='layout-children-grid'>
            <Grid item xs={12} className='layout-children-right chat-room'>
                <Grid className='chat-right-title text-center-flex'>
                    <Typography m={0} align='center' variant="p" gutterBottom>
                        phòng trao đổi
                    </Typography>
                </Grid>
                <Grid className='layout-children-right-content chat-right'>
                    <List className='layout-children-list-mentor chat-content'>
                        {
                            conversations.length > 0 && conversations.map((obj, key) => {
                                return (
                                    <ListItem className={obj.id === userId ? 'justify-end' : ''}>
                                        <Grid>
                                            <Grid className={obj.id === userId ? 'text-end' : ''}>
                                                <Typography ml={1} variant="p" gutterBottom>
                                                    {obj.id === userId ? 'You' : obj.name}
                                                </Typography>
                                            </Grid>
                                            <List>
                                                {
                                                    obj.message.map((mes, key) => {
                                                        return (
                                                            <ListItem
                                                                className={key === 0 && obj.message.length > 2 ?
                                                                    'messages-item first-message' :
                                                                    `${key === obj.message.length - 1 && obj.message.length > 2 ?
                                                                        'messages-item last-message' : 'messages-item middle-message'}`}
                                                            >
                                                                <Typography className='messages-item-text' ml={1} variant="body1" gutterBottom>
                                                                    {mes}
                                                                </Typography>
                                                            </ListItem>
                                                        )
                                                    })
                                                }
                                            </List>
                                        </Grid>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Grid>
                <Grid container className='message-input'>
                    <Grid item className='message-input-tag' xs={7} sm={9} md={10} pr={1}>
                        <input
                            value={valueMessage}
                            onChange={(e) => setValueMessage(e.target.value)}
                            className='message-input-value'
                            placeholder='Nhập thông tin...'
                        >
                        </input>
                    </Grid>

                    <Grid item xs={5} sm={3} md={2} className='message-input-send'>
                        <TelegramIcon className='message-input-send-icon' />
                        <ImageIcon className='message-input-send-icon' />
                        <Button className='ipad-pc' variant="contained" color="error" onClick={endConversation}>
                            END
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ChatRoomComponent