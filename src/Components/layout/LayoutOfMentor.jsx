import { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import { getCourses } from '../../Services/CourseService';
import './layout.css'
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { List, ListItem, ListItemIcon } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../../Context/AuthLogin';
import Typography from '@mui/material/Typography';
import { Outlet, useNavigate } from 'react-router-dom';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function LayoutOfMentorComponent() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { setIsOutlet, isOutlet } = useContext(AuthContext);
    const [listCourses, setListCourse] = useState([]);
    const [courses, setCourses] = useState([]);
    const [listGroupConversation, setListGroupConversation] = useState([
        {
            name: 'NODEJS',
            guyOfPresent: 'Các mentor cho em hỏi phần validate bằng formik với ạ',
            name_guy: 'Phú Chu'
        },
        {
            name: 'HTML,CSS',
            guyOfPresent: 'Các mentor cho em hỏi phần validate bằng formik với ạ',
            name_guy: 'Phú Chu'
        },
        {
            name: 'REACTJS',
            guyOfPresent: 'Các mentor cho em hỏi phần validate bằng formik với ạ',
            name_guy: 'Phú Chu'
        },
        {
            name: 'JAVA',
            guyOfPresent: 'Các mentor cho em hỏi phần validate bằng formik với ạ',
            name_guy: 'Phú Chu'
        },
        {
            name: 'VUEJS',
            guyOfPresent: 'Các mentor cho em hỏi phần validate bằng formik với ạ',
            name_guy: 'Phú Chu'
        },
        {
            name: 'SQL SEVER',
            guyOfPresent: 'Các mentor cho em hỏi phần validate bằng formik với ạ',
            name_guy: 'Phú Chu'
        },
        {
            name: 'JAVASCRIPT',
            guyOfPresent: 'Các mentor cho em hỏi phần validate bằng formik với ạ',
            name_guy: 'Phú Chu'
        },
        {
            name: '.NET',
            guyOfPresent: 'Các mentor cho em hỏi phần validate bằng formik với ạ',
            name_guy: 'Phú Chu'
        },
        {
            name: 'PYTHON',
            guyOfPresent: 'Các mentor cho em hỏi phần validate bằng formik với ạ',
            name_guy: 'Phú Chu'
        }
    ]);

    const moveToChatRoom = (event) => {
        navigate('/chat-room')
    };

    const moveToGroupChat = (event) => {
        setIsOutlet(true);
        navigate('/home/group-chat-mentor')
    };

    const moveToGroupChatMobile = (event) => {
        navigate('/group-chat-mentor')
    };

    useEffect(() => {
        getCourses((rs) => {
            if (rs.statusCode === 200 && rs.data.length > 0) {
                setListCourse(rs.data.map(obj => obj.code));
            }
        })
    }, [])
    return (
        <Grid className='layout-children'>
            <Grid container className='layout-mentor'>
                <Grid item xs={12} sm={12} md={4} lg={4} className='layout-mentor-left'>
                    <FormControl fullWidth>
                        <InputLabel id="demo-multiple-chip-label">Courese</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            name="courses"
                            value={courses}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {listCourses.length > 0 && listCourses.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, courses, theme)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Grid className='list-group-chat ipad-pc' mt={1}>
                        <List>
                            {listGroupConversation.length > 0 && listGroupConversation.map((obj, key) => {
                                return (
                                    <ListItem button key={key} onClick={moveToGroupChat}>
                                        <Grid container rowSpacing={4}>
                                            <Grid item xs={3}>
                                                <Avatar alt="Remy Sharp" src={require('../../assets/img/logo-funix.png')} />
                                            </Grid>
                                            <Grid item xs={9} className='group-chat-item-right'>
                                                <FormControl fullWidth>
                                                    <Typography
                                                        align='center'
                                                        variant="h5"
                                                        gutterBottom
                                                        noWrap={true}
                                                        className='layout-children-content-item-title'
                                                    >
                                                        {obj.name}
                                                    </Typography>
                                                </FormControl>
                                                <FormControl fullWidth>
                                                    <Typography
                                                        align='center'
                                                        variant="p"
                                                        noWrap={true}
                                                        gutterBottom
                                                        className='layout-children-content-item-title'
                                                    >
                                                        <Typography variant='p'>{obj.name_guy}</Typography> : {obj.guyOfPresent}
                                                    </Typography>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Grid>
                    <Grid className='list-group-chat mobile' mt={1}>
                        <List>
                            {listGroupConversation.length > 0 && listGroupConversation.map((obj, key) => {
                                return (
                                    <ListItem button key={key} onClick={moveToGroupChatMobile}>
                                        <Grid container rowSpacing={4}>
                                            <Grid item xs={3} sm={2} className='text-center-justify'>
                                                <Avatar alt="Remy Sharp" src={require('../../assets/img/logo-funix.png')} />
                                            </Grid>
                                            <Grid item xs={9} sm={10} className='group-chat-item-right group-chat-item-right-mobile'>
                                                <Grid>
                                                    <FormControl fullWidth>
                                                        <Typography
                                                            variant="h5"
                                                            gutterBottom
                                                            noWrap={true}
                                                            className='layout-children-content-item-title  group-chat-content-title'
                                                        >
                                                            {obj.name}
                                                        </Typography>
                                                    </FormControl>
                                                    <FormControl fullWidth>
                                                        <Typography
                                                            variant="p"
                                                            noWrap={true}
                                                            gutterBottom
                                                            className='layout-children-content-item-title  group-chat-content-title'
                                                        >
                                                            <Typography variant='p'>{obj.name_guy}</Typography> : {obj.guyOfPresent}
                                                        </Typography>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={8} lg={8} className='layout-mentor-right ipad-pc'>
                    {
                        isOutlet ? <Outlet /> : <Grid className='not-outlet text-center-flex'>
                            <Typography
                                variant="p"
                                noWrap={true}
                                color={''}
                                fontWeight={600}
                                gutterBottom
                                className='layout-children-content-item-title  group-chat-content-title'
                            >
                                Hãy chọn một nhóm thông báo
                            </Typography>
                        </Grid>
                    }
                </Grid>
            </Grid>
        </Grid>
    )
};

export default LayoutOfMentorComponent;