import { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import { getCourseDetail } from '../../Services/CourseService';
import './layout.css'
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { List, ListItem } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../../Context/AuthLogin';
import Typography from '@mui/material/Typography';
import { Outlet, useNavigate } from 'react-router-dom';
import { getUserDetail } from '../../Services/UserService';


function getStyles(name, listCourses, theme) {
    return {
        fontWeight:
            listCourses.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function LayoutOfMentorComponent() {

    const theme = useTheme();
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const { setIsOutlet, isOutlet } = useContext(AuthContext);
    const [listCourses, setListCourse] = useState([]);
    const [listCourseChat, setListCourseChat] = useState([]);
    const [courses, setCourses] = useState("");

    const handleSelectCourse = (event) => {
        setCourses(event.target.value);
        let course_id = event.target.value._id
        getCourseDetail((rs) => {
            setListCourseChat(rs.data);
        }, course_id)
    };

    const moveToGroupChat = (id) => {
        setIsOutlet(true);
        navigate(`/home/group-chat-mentor/${id}`)
    };

    const moveToGroupChatMobile = (id) => {
        navigate(`/group-chat-mentor/${id}`)
    };

    useEffect(() => {
        getUserDetail((rs) => {
            if (rs.statusCode === 200) {
                setListCourse(rs.data.courses);
                setListCourseChat(rs.data.courses);
            }
        }, userId, "");
    }, [])
    return (
        <Grid className='layout-children layout-mentor-main'>
            <Grid container className='layout-mentor'>
                <Grid item xs={12} sm={12} md={4} lg={4} className='layout-mentor-left'>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">Courses</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={courses}
                            label="courses"
                            onChange={(e) => handleSelectCourse(e)}
                        >
                            <MenuItem value="">
                                <em>Tất cả</em>
                            </MenuItem>
                            {listCourses.length > 0 && listCourses.map((obj, key) => (
                                <MenuItem
                                    key={key}
                                    value={obj}
                                    style={getStyles(obj, listCourses, theme)}
                                >
                                    {obj.code}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Grid className='list-group-chat ipad-pc' mt={1}>
                        <List>
                            {listCourseChat.length > 0 && listCourseChat.map((obj, key) => {
                                return (
                                    <ListItem button key={key} onClick={() => moveToGroupChat(obj._id)}>
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
                                                        {obj.code}
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
                                                        {obj.name}
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
                            {listCourseChat.length > 0 && listCourseChat.map((obj, key) => {
                                return (
                                    <ListItem button key={key} onClick={() => moveToGroupChatMobile(obj._id)} className='list-group-chat-item'>
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
                                                            {obj.code}
                                                        </Typography>
                                                    </FormControl>
                                                    <FormControl fullWidth>
                                                        <Typography
                                                            variant="p"
                                                            noWrap={true}
                                                            gutterBottom
                                                            className='layout-children-content-item-title  group-chat-content-title'
                                                        >
                                                            {obj.name}
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