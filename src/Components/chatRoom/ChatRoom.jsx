import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { List, ListItem } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button';
import TelegramIcon from '@mui/icons-material/Telegram';
import './chatRoom.css';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from './CountdownTimer';


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
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const endConversation = () => {
        navigate('/home')
    }

    const sendMessage = () => {

    }

    useEffect(() => {
        const countdown = setInterval(() => {
            if (seconds === 59) {
                setMinutes(prev => prev + 1);
                setSeconds(-1);
            }

            if (seconds >= 0) {
                setSeconds(prev => prev + 1);
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, [minutes, seconds]);

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };
    return (
        <Grid container className='layout-children-grid'>
            <Grid item xs={12} className='layout-children-right chat-room'>
                <Grid className='chat-right-title text-around-flex'>
                    <Grid>
                        <span>{formatTime(minutes)}:</span>
                        <span>{formatTime(seconds)}</span>
                    </Grid>
                    <Typography m={0} align='center' variant="p" gutterBottom>
                        phòng trao đổi
                    </Typography>
                    <Button className='ipad-pc ' variant="contained" color="error" onClick={endConversation}>
                        END
                    </Button>
                </Grid>
                <Grid className='layout-children-right-content chat-right'>
                    <List className='layout-children-list-mentor chat-content'>
                        {
                            conversations.length > 0 && conversations.map((obj, key) => {
                                return (
                                    <ListItem key={key} className={obj.id === userId ? 'justify-end' : ''}>
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
                                                                className={obj.id === userId ? 'messages-item justify-end' : 'messages-item'}
                                                                key={key}
                                                            >
                                                                <Typography
                                                                    className={key === 0 && obj.message.length > 2 ?
                                                                        'messages-item-text first-message' :
                                                                        `${key === obj.message.length - 1 && obj.message.length > 2 ?
                                                                            'messages-item-text last-message' : 'messages-item-text middle-message'}`}
                                                                    ml={1}
                                                                    variant="body1"
                                                                    gutterBottom
                                                                >
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
                <Grid className='message-input'>
                    <Grid container className='message-input-content'>
                        <Grid item className='message-input-tag' xs={9} sm={9} md={10} lg={11} pr={1}>
                            <input
                                value={valueMessage}
                                onChange={(e) => setValueMessage(e.target.value)}
                                className='message-input-value'
                                placeholder='Nhập thông tin...'
                            >
                            </input>
                        </Grid>

                        <Grid item xs={3} sm={3} md={2} lg={1} className='message-input-send'>
                            <TelegramIcon className='message-input-send-icon' />
                            <Button
                                component="label"
                            >
                                <input
                                    type="file"
                                    hidden
                                />
                                <ImageIcon className='message-input-send-icon' />
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ChatRoomComponent