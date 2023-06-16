import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { List, ListItem } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button';
import TelegramIcon from '@mui/icons-material/Telegram';
import './chatRoom.css';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getRoomChat, endRoomChat } from '../../Services/RoomChatService';
import { API_URL } from '../../Constants/ApiConstant';
import io from 'socket.io-client';

const socket = io(API_URL);

const userId = localStorage.getItem('userId');


function ChatRoomComponent() {

    const navigate = useNavigate();
    const { roomId } = useParams();
    const [valueMessage, setValueMessage] = useState('');
    const [conversations, setConversations] = useState([])
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const endConversation = () => {
        endRoomChat((rs) => {
            if(rs.statusCode === 200) {
                navigate('/home')
                toast.success('Buổi trao đổi kết thúc!')
            } else {
                toast.error('Có lỗi trong quá trình xử lý!')
            }
        },roomId)
    }

    const sendMessage = () => {
        let data = {
            sender: userId,
            content: valueMessage,
            room_id: roomId,
        }
        if(valueMessage !== '') {
            socket.emit('send-message', data);
            setValueMessage('');
        }
    }

    const sendMessageEnter = (e) => {
        let data = {
            sender: userId,
            content: valueMessage,
            room_id: roomId,
        }
        if(valueMessage !== '' && e.key === 'Enter') {
            socket.emit('send-message', data);
            setValueMessage('');
        }
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

    useEffect(() => {
        getRoomChat((rs) => {
            if(rs.statusCode === 200) {
                setConversations(rs.data)
            } else {
                toast.error(rs.message);
                navigate('/home')
            }
        }, roomId)
    }, [])

    useEffect(() => {
        socket.on('create-new-message', (data) => {
            setConversations(prev => [...prev,...data]);
        });

        return () => {
            socket.off();
        }
    }, [])

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
                                    <ListItem key={key} className={obj.sender._id === userId ? 'justify-end' : ''}>
                                        <Grid>
                                            <Grid className={obj.sender._id === userId ? 'text-end' : ''}>
                                                <Typography ml={1} variant="p" gutterBottom>
                                                    {obj.sender._id === userId ? 'You' : obj.sender.username}
                                                </Typography>
                                            </Grid>
                                            <List>
                                                <ListItem
                                                    className={obj.sender._id === userId ? 'messages-item justify-end' : 'messages-item'}
                                                >
                                                    <Typography
                                                        className='messages-item-text middle-message'
                                                        // className={key === 0 && obj.message.length > 2 ?
                                                        //     'messages-item-text first-message' :
                                                        //     `${key === obj.message.length - 1 && obj.message.length > 2 ?
                                                        //         'messages-item-text last-message' : 'messages-item-text middle-message'}`}
                                                        ml={1}
                                                        variant="body1"
                                                        gutterBottom
                                                    >
                                                        {obj.content}
                                                    </Typography>
                                                </ListItem>
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
                                onKeyUp={(e) => sendMessageEnter(e)}
                            >
                            </input>
                        </Grid>

                        <Grid item xs={3} sm={3} md={2} lg={1} className='message-input-send'>
                            <TelegramIcon className='message-input-send-icon' onClick={sendMessage} />
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