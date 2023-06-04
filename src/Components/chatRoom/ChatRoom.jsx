import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemIcon } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import TelegramIcon from '@mui/icons-material/Telegram';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import OutlinedInput from '@mui/material/OutlinedInput';
import './chatRoom.css';
import { useNavigate } from 'react-router-dom';


const userId = localStorage.getItem('userId');

const conversations = [
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Hi','Chơi liên minh khônggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Chơi luôn','Ông rank j rồi?','Ông rank j rồi?'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Kim cương 4','Chú đủ tuổi chơi không?','Chú đủ tuổi chơi không?','Chú đủ tuổi chơi không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Solo luôn','Sợ cái gì, let go!'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Hi','Chơi liên minh không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Chơi luôn','Ông rank j rồi?'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Kim cương 4','Chú đủ tuổi chơi không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Solo luôn','Sợ cái gì, let go!'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Hi','Chơi liên minh không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Chơi luôn','Ông rank j rồi?'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Kim cương 4','Chú đủ tuổi chơi không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Solo luôn','Sợ cái gì, let go!'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Hi','Chơi liên minh không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Chơi luôn','Ông rank j rồi?'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Kim cương 4','Chú đủ tuổi chơi không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Solo luôn','Sợ cái gì, let go!'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Hi','Chơi liên minh không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Chơi luôn','Ông rank j rồi?'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Kim cương 4','Chú đủ tuổi chơi không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Solo luôn','Sợ cái gì, let go!'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Hi','Chơi liên minh không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Chơi luôn','Ông rank j rồi?'],
        date: Date.now(),
    },
    {
        id: userId,
        name: 'Phú Chu',
        path: '',
        message: ['Kim cương 4','Chú đủ tuổi chơi không?'],
        date: Date.now(),
    },
    {
        id: '1kdfsi3kadf',
        name: 'Vũ Duy',
        path: '',
        message: ['Solo luôn','Sợ cái gì, let go!'],
        date: Date.now(),
    },
  ];


function ChatRoomComponent() {

    const navigate = useNavigate();
    const[valueMessage,setValueMessage] = useState();

    const endConversation = () => {
        navigate('/home')
    }

    const sendMessage = () => {

    }
  return (
    <Grid container className='layout-children-grid'>
        <Grid  item xs={2} className='layout-children-left'>
            <Grid className='layout-children-left-content'>
                <Grid direction={'column'} className='layout-children-middle layout-children-grid-left-content'>
                    <Typography variant="h4" gutterBottom>Phòng Trao Đổi Mentor - Học Viên</Typography>
                    <Grid>
                        <Button variant="contained" color="error" onClick={endConversation}>
                            Kết Thúc
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid  item xs={10} className='layout-children-right'>
            <Grid className='chat-right-title'>
                <Typography variant="p" gutterBottom>
                    funix center
                </Typography>
            </Grid>
            <Grid className='layout-children-right-content chat-right'>
                <List className='layout-children-list-mentor chat-content'>
                    {
                       conversations.length > 0 && conversations.map((obj,key) => {
                            return (
                            <ListItem className={obj.id === userId? 'justify-end' : ''}> 
                                <Grid>
                                    <Grid className={obj.id === userId? 'text-end' : ''}>
                                        <Typography ml={1} variant="p" gutterBottom>
                                            {obj.id === userId?'You' : obj.name}
                                        </Typography>
                                    </Grid>
                                    <List>
                                        {
                                            obj.message.map((mes,key) => {
                                                return (
                                                    <ListItem 
                                                    className={key === 0 && obj.message.length > 2? 
                                                        'messages-item first-message' : 
                                                        `${key === obj.message.length - 1 && obj.message.length > 2?
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
            <Grid className='message-input'>
                <Grid>
                    <OutlinedInput 
                        color='primary'
                        value={valueMessage}
                        onChange={(e) => setValueMessage(e.target.value)}
                        className='message-input-value'
                    >
                    </OutlinedInput>
                </Grid>
                <Grid className='message-input-send'>
                    <TelegramIcon className='message-input-send-icon'/>
                    <AttachFileIcon className='message-input-send-icon'/>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default ChatRoomComponent