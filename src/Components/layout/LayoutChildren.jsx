import { useState, useContext, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { getCourses } from '../../Services/CourseService';
import './layout.css'
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { List, ListItem, ListItemIcon } from '@mui/material';
import LayoutOfMentorComponent from './LayoutOfMentor';
import TextareaAutosize from '@mui/base/TextareaAutosize';  
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Form, useNavigate } from 'react-router-dom';


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

function LayoutChildrenComponent() {
    const role = localStorage.getItem('role');
    const [listCourses, setListCourse] = useState([]);
    const theme = useTheme();
    const navigate = useNavigate();
    const [personName, setPersonName] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const moveToChatRoom = (event) => {
        navigate('/chat-room')
    };

    useEffect(() => {
        console.log(role);
        getCourses((rs) => {
            if (rs.statusCode === 200 && rs.data.length > 0) {
                setListCourse(rs.data.map(obj => obj.code));
            }
        })
    }, [])
    return (
        <>
            {
                role == 'ADMIN' || role == 'MENTOR'? 
                <LayoutOfMentorComponent/> :
                <Grid className='layout-children'>
                <Grid container className='layout-children-content'>
                    <Grid className='layout-children-content-item'>
                        <Typography align='center' variant="h3" gutterBottom className='layout-children-content-item-title'>Ask Mentor</Typography>
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-name-label">Môn Học</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput label="Môn Học" />}
                                MenuProps={MenuProps}
                            >
                                {listCourses.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                        style={getStyles(name, personName, theme)}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
    
                    <Grid className='layout-children-content-item'>
                        <FormControl fullWidth>
                            <Typography variant="h6" gutterBottom>Câu hỏi (*)</Typography>
                            <TextareaAutosize className='layout-children-content-item-textarea'></TextareaAutosize>
                        </FormControl>
                    </Grid>
    
                    <Grid className='layout-children-content-item'>
                        <FormControl fullWidth>
                            <Typography variant="h6" gutterBottom>Bạn đã thử cách gì để tìm kiếm câu trả lời? (*)</Typography>
                            <TextareaAutosize className='layout-children-content-item-textarea'></TextareaAutosize>
                        </FormControl>
                    </Grid>
    
                    <Grid className='layout-children-content-item'>
                        <FormControl fullWidth>
                            <Typography variant="h6" gutterBottom>File đính kèm ({'<'}5MB)</Typography>
                            <Button
                                variant="contained"
                                component="label"
                            >
                                <input
                                    type="file"
                                />
                            </Button>
                        </FormControl>
                    </Grid>
                                    
                    <Grid className='layout-children-content-item text-center'>
                        <Button color='error' variant='outlined'>
                            Hỏi Mentor
                        </Button>
                    </Grid>
                </Grid>
                </Grid> 
            }
        </>
    )
};

export default LayoutChildrenComponent;