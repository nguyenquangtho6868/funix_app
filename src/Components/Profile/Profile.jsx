
import { useEffect, useState } from 'react';
import { API_URL } from '../../Constants/ApiConstant';
import { Grid, Box, Typography } from '@mui/material';
import { getUserDetail } from '../../Services/UserService';
import { toast } from 'react-toastify';
import './profile.css';


function ProfileComponent() {
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserDetail((rs) => {
            if (rs.statusCode === 200) {
                console.log(rs.data);
                setUser(rs.data);
            } else {
                toast.error('Có lỗi trong quá trình xử lý!')
            }
        }, userId, '')
    }, []);

    return (
        <Grid className='layout-children layout-mentor-main'>
            <Grid className='layout-mentor'>
                <Grid container>
                    <Grid item sx={4} lg={5}>
                        {
                            user && user.file ? <Box sx={{ height: '100%' }} display="flex" justifyContent="center" alignItems="center">
                                <img className='user-image' src="" alt="" />
                            </Box>
                                :
                                <Box sx={{ height: '100%' }} display="flex" justifyContent="center" alignItems="center">
                                    <img className='user-image' style={{ width: '50%' }} src={require('../../assets/img/add-image.jpg')} alt="" />
                                </Box>
                        }

                    </Grid>

                    <Grid item sx={8} lg={7}>
                        {
                            user && <Box sx={{ minHeight: '30vh' }}>
                                <Box sx={{ width: '100%', paddingBottom: '3rem' }} display="flex" justifyContent="center" fullWith>
                                    <Typography variant='h2'>Thông Tin Tài Khoản</Typography>
                                </Box>
                                <Box display="flex" fullWith marginBottom="2rem">
                                    <Typography
                                        sx={{
                                            alignSelf: 'center',
                                            width: '15%',
                                            fontWeight: '600',
                                            fontSize: '1.2rem'
                                        }}
                                    >
                                        Email
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            padding: '12px 16px',
                                            width: '80%',
                                            borderRadius: '5px',
                                        }}
                                    >
                                        {user.email}
                                    </Box>
                                </Box>
                                <Box display="flex" fullWith marginBottom="2rem">
                                    <Typography
                                        sx={{
                                            alignSelf: 'center',
                                            width: '15%',
                                            fontWeight: '600',
                                            fontSize: '1.2rem'
                                        }}>
                                        Name
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            padding: '12px 16px',
                                            width: '80%',
                                            borderRadius: '5px'
                                        }}
                                    >
                                        {user.username}
                                    </Box>
                                </Box>
                                <Box display="flex" fullWith marginBottom="2rem">
                                    <Typography
                                        sx={{
                                            alignSelf: 'center',
                                            width: '15%',
                                            fontWeight: '600',
                                            fontSize: '1.2rem'
                                        }}>
                                        Chức vụ
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            padding: '12px 16px',
                                            width: '80%',
                                            borderRadius: '5px'
                                        }}
                                    >
                                        {user.role}
                                    </Box>
                                </Box>

                                <Box display="flex" fullWith marginBottom="2rem">
                                    <Typography
                                        sx={{
                                            alignSelf: 'center',
                                            width: '15%',
                                            fontWeight: '600',
                                            fontSize: '1.2rem'
                                        }}>
                                        Mật khẩu
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            padding: '12px 16px',
                                            width: '80%',
                                            borderRadius: '5px'
                                        }}
                                    >
                                        {user.password}
                                    </Box>
                                </Box>
                            </Box>
                        }
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    )
};

export default ProfileComponent;