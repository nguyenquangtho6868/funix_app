import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import './layout.css'
import { useTheme } from '@mui/material/styles';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { List, ListItem } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from 'react-router-dom';
import { getlistNotification } from '../../Services/NotificationService';
import { toast } from 'react-toastify';
import { API_URL } from '../../Constants/ApiConstant';
import io from 'socket.io-client';

const socket = io(API_URL);


function LayoutMentorChildComponent() {
    const { id } = useParams();
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);

    const backView = () => {
        navigate('/home')
    }

    const supportNow = (obj) => {
        let data = {
            notification_id: obj._id,
            roomId: obj.room,
            mentor_id: userId
        }
        socket.emit('mentor-support-now', data);
    }

    useEffect(() => {
        getlistNotification((rs) => {
            setNotifications(rs.data)
        }, id)
    }, [id])

    useEffect(() => {
        socket.on(`get-create-notification/${id}`, (data) => {
            setNotifications(prev => [...prev,data])
        });

        socket.on('quantity-room-chat-full', () => {
            toast.warning('Phòng này đã có Mentor hỗ trợ!')
        });

        socket.on('join-room-chat-success', (data) => {
            navigate(`/chat-room/${data.roomId}`)
        });

        return () => {
          socket.off();
        };
    }, []);
    
    return (
        <Grid className='layout-children'>
            <Grid className='layout-mentor-child'>
                <Grid className='layout-mentor-child-header text-center-align' pl={2} >
                    <Grid className='layout-nav-list-item mobile'>
                        <IconButton className='layout-mentor-btn-back' onClick={backView}>
                            <ArrowBackIosIcon ></ArrowBackIosIcon>
                        </IconButton>
                    </Grid>
                    <Grid container className='group-chat-mobile'>
                        <Grid item xs={2} sm={1} className='text-center-align'>
                            <Avatar alt="Remy Sharp" src={require('../../assets/img/logo-funix.png')} />
                        </Grid>
                        <Grid item xs={6} className='group-chat-mobile-text'>
                            <Grid>
                                <Typography
                                    variant="p"
                                    gutterBottom
                                    noWrap={true}
                                    className='layout-children-content-item-title group-chat-content-title  group-chat-content-title-top'
                                >
                                    NODEJS
                                </Typography>
                            </Grid>
                            <Grid >
                                <Typography
                                    align='center'
                                    variant="h6"
                                    noWrap={true}
                                    gutterBottom
                                    className='layout-children-content-item-title group-chat-content-title text-center-align'
                                >
                                    <PermIdentityIcon className='group-chat-content-icon-member' /> 4 Mentors
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className='layout-mentor-child-content'>

                </Grid>
                <Grid className='layout-mentor-child-content '>
                    <List className='layout-children-list-mentor list-notification'>
                        {
                            notifications.length > 0 && notifications.map((obj, key) => {
                                return (
                                    <ListItem key={key}>
                                        <Grid className='student-question'>
                                            <Typography ml={1} variant="p" gutterBottom>
                                                {obj.name_student}
                                            </Typography>
                                            <Grid>
                                                <Typography variant="body1" gutterBottom className='text-question'>
                                                    <Typography variant='p'>Câu hỏi :</Typography> {obj.question}
                                                </Typography>
                                            </Grid>
                                            <Grid>
                                                <Typography variant="body1" gutterBottom className='text-question'>
                                                    <Typography variant='p'>Mô tả :</Typography> {obj.description}
                                                </Typography>
                                            </Grid>
                                            <Grid className='text-center'>
                                                <Button onClick={() => supportNow(obj)} className='btn-support-student' color='secondary'>
                                                    Hỗ Trợ Ngay
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default LayoutMentorChildComponent;