import React, { useState, useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { List, ListItem } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button';
import TelegramIcon from '@mui/icons-material/Telegram';
import './chatRoom.css';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getRoomChat, endRoomChat, getRoomChatWithId } from '../../Services/RoomChatService';
import { API_URL } from '../../Constants/ApiConstant';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Avatar from '@mui/material/Avatar';
import io from 'socket.io-client';
import { Howl } from 'howler';
const socket = io(API_URL);

const userId = localStorage.getItem('userId');


function ChatRoomComponent() {

    const list = useRef(null);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [isBottom, setIsBottom] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [isMentorIn, setIsMentorIn] = useState(false);
    const [valueMessage, setValueMessage] = useState('');
    const [conversations, setConversations] = useState([]);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const endConversation = () => {
        getRoomChatWithId((rs) => {
            if (rs.statusCode === 200) {
                const getUser = rs.data.users.filter(item => item !== userId);
                if (getUser) {
                    endRoomChat((rs) => {
                        if (rs.statusCode === 200) {
                            socket.emit('end-conversation', getUser[0]);
                            navigate('/home');
                            toast.success('Buổi trao đổi kết thúc!');
                            localStorage.setItem('seconds', 0);
                            localStorage.setItem('minutes', 0);
                        } else {
                            toast.error('Có lỗi trong quá trình xử lý!');
                        }
                    }, roomId)
                } else {
                    endRoomChat((rs) => {
                        if (rs.statusCode === 200) {
                            navigate('/home');
                            toast.success('Buổi trao đổi kết thúc!');
                            localStorage.setItem('seconds', 0);
                            localStorage.setItem('minutes', 0);
                        } else {
                            toast.error('Có lỗi trong quá trình xử lý!');
                        }
                    }, roomId)
                }
            } else {
                toast.error('Có lỗi trong quá trình xử lý!');
                return;
            }
        }, roomId);
    }

    const handleSendMessage = (data) => {
        socket.emit('send-message', data);
        setValueMessage('');
        const sound = new Howl({
            src: [require('../../assets/sounds/send.mp3')] // Đường dẫn đến file âm thanh
        });
        sound.play();
    }

    const sendMessage = () => {
        let data = {
            sender: userId,
            content: valueMessage,
            room_id: roomId,
            prev_message: conversations[conversations.length - 1]
        }
        if (valueMessage !== '') {
            handleSendMessage(data);
        }
    }

    const sendMessageEnter = (e) => {
        let data = {
            sender: userId,
            content: valueMessage,
            room_id: roomId,
            prev_message: conversations[conversations.length - 1]
        }
        if (valueMessage !== '' && e.key === 'Enter') {
            handleSendMessage(data);
        }
    }

    const handleScrollListChat = (e) => {
        let rollDistance = e.currentTarget.scrollHeight - e.currentTarget.offsetHeight - e.currentTarget.scrollTop;
        if (rollDistance > 500) {
            setIsBottom(true);
        }
        if (rollDistance === 0) {
            setIsBottom(false);
        }
    }

    const onBottom = () => {
        list.current.scrollTo({ top: list.current.scrollHeight, behavior: 'smooth' });
    }


    useEffect(() => {
        const getMinutes = Number(localStorage.getItem('minutes'));
        const getSeconds = Number(localStorage.getItem('seconds'));
        if (minutes < getMinutes) setMinutes(getMinutes);
        if (seconds < getSeconds) setSeconds(getSeconds);
        const countdown = setInterval(() => {
            if (isMentorIn) {
                if (seconds === 59) {
                    setMinutes(prev => {
                        localStorage.setItem('minutes', prev + 1);
                        return prev + 1;
                    });
                    setSeconds(-1);

                }

                if (seconds >= 0) {
                    setSeconds(prev => {
                        localStorage.setItem('seconds', prev + 1)
                        return prev + 1;
                    });
                }
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, [minutes, seconds, isMentorIn]);

    useEffect(() => {
        getRoomChatWithId((rs) => {
            if (rs.statusCode === 200) {
                const checkUser = rs.data.users.some(item => item === userId);
                if (!checkUser) {
                    toast.error('Bạn không có quyền truy cập!');
                    navigate('/home');
                }
            } else {
                toast.error('Có lỗi trong quá trinh xử lý!');
            }
        }, roomId);
        getRoomChat((rs) => {
            if (rs.statusCode === 200) {
                setConversations(rs.data)
            } else {
                toast.error(rs.message);
                navigate('/home')
            }
        }, roomId);
    }, []);

    useEffect(() => {
        socket.on('create-new-message', (data) => {
            setConversations(prev => [...prev, ...data]);
            if (data[0].sender._id !== userId) {
                const sound = new Howl({
                    src: [require('../../assets/sounds/recive.mp3')] // Đường dẫn đến file âm thanh
                });
                sound.play();
            }
        });

        socket.on('update-message', (data) => {
            setConversations(prev => [...prev.slice(0, prev.length - 1), ...data]);
        });

        socket.on(`mentor-in-room-chat/${roomId}`, (data) => {
            setIsMentorIn(true);
        });

        socket.on(`end-conversation-success/${userId}`, () => {
            navigate('/home');
            toast.success('Buổi trao đổi kết thúc!');
        });

        return () => {
            socket.off();
        }
    }, [])

    useEffect(() => {
        list.current.scrollTo({ top: list.current.scrollHeight, behavior: 'smooth' });
    }, [conversations]);

    useEffect(() => {
        if (valueMessage === '') {
            setIsSend(false);
        } else {
            setIsSend(true);
        }
    }, [valueMessage]);

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
                    <List className='layout-children-list-mentor chat-content' ref={list} onScroll={handleScrollListChat}>
                        {
                            conversations.length > 0 && conversations.map((obj, key) => {
                                return (
                                    <Grid key={key} >
                                        <ListItem className={obj.sender._id === userId ? 'justify-end' : ''}>
                                            <Grid>
                                                <Grid className={obj.sender._id === userId ? 'text-end-justify' : ''}>
                                                    <Avatar
                                                        className={obj.sender.role === 'MENTOR' || obj.sender.role === 'ADMIN' ? 'display-none' : ''}
                                                        sx={{ height: '24px', width: '24px' }}
                                                        src={require('../../assets/img/logo-funix.png')}
                                                    />
                                                    <Avatar
                                                        className={obj.sender.role === 'STUDENT' ? 'display-none' : ''}
                                                        sx={{ height: '24px', width: '24px' }}
                                                        src={require('../../assets/img/mentor.png')}
                                                    />
                                                </Grid>
                                                <List>
                                                    {
                                                        obj.content.length > 0 && obj.content.map((item, i) => {
                                                            return <ListItem
                                                                key={i}
                                                                className={obj.sender._id === userId ? 'messages-item justify-end' : 'messages-item'}
                                                            >
                                                                <Typography
                                                                    className={obj.sender._id === userId ?
                                                                        'messages-item-text middle-message messages-item-text-sender' :
                                                                        'messages-item-text middle-message messages-item-text-receiver'
                                                                    }
                                                                    // className={key === 0 && obj.message.length > 2 ?
                                                                    //     'messages-item-text first-message' :
                                                                    //     `${key === obj.message.length - 1 && obj.message.length > 2 ?
                                                                    //         'messages-item-text last-message' : 'messages-item-text middle-message'}`}
                                                                    ml={1}
                                                                    variant="body1"
                                                                    gutterBottom
                                                                >
                                                                    {item}
                                                                </Typography>
                                                            </ListItem>
                                                        })
                                                    }
                                                </List>
                                            </Grid>
                                        </ListItem>
                                        <Grid
                                            className={conversations.length - 1 === key ?
                                                'text-center-justify chat-time-distance display-none'
                                                : 'text-center-justify chat-time-distance'}>
                                            {obj.createdAtTime}
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }
                    </List>
                    <Grid className={isBottom ? 'display-block' : 'display-none'} onClick={onBottom}>
                        <Grid className='button-on-bottom-chat'>
                            <ArrowDownwardIcon />
                        </Grid>
                    </Grid>
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
                            <Grid className={isSend ? 'is-typing' : 'not-typing'}>
                                <TelegramIcon className='message-input-send-icon' onClick={sendMessage} />
                            </Grid>
                            <Button
                                className={isSend ? 'display-none' : ''}
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