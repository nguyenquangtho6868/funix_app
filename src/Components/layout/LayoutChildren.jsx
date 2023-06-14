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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LayoutOfMentorComponent from './LayoutOfMentor';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../Constants/ApiConstant';

import io from 'socket.io-client';

const socket = io(API_URL);

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


function getStyles(id, theme) {
    return {
        fontWeight:
            id? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function LayoutChildrenComponent() {
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    const [listCourses, setListCourse] = useState([]);
    const theme = useTheme();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            question: '',
            description: '',
            course_id: '',
        },
        validationSchema: Yup.object({
            question: Yup.string().required('Trường này không được bỏ trống!'),
            description: Yup.string().required('Trường này không được bỏ trống!'),
            course_id: Yup.string().required('Bạn chưa chọn môn học!'),

        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            let data = {
                question: values.question,
                description: values.description,
                course_id: values.course_id,
                user_id: userId
            }
            socket.emit('post-notification',data)
        },
    })

    const moveToChatRoom = (event) => {
        navigate('/chat-room')
    };

    useEffect(() => {
        getCourses((rs) => {
            if (rs.statusCode === 200 && rs.data.length > 0) {
                setListCourse(rs.data);
            }
        })
    }, [])
    return (
        <>
            {
                role == 'ADMIN' || role == 'MENTOR' ?
                    <LayoutOfMentorComponent /> :
                    <Grid className='layout-children'>
                        <Grid container className='layout-children-content'>
                            <Grid className='layout-children-content-item'>
                                <Typography align='center' variant="h3" gutterBottom className='layout-children-content-item-title'>Ask Mentor</Typography>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-name-label">Môn Học</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        value={formik.values.course_id}
                                        onChange={formik.handleChange}
                                        name='course_id'
                                        input={<OutlinedInput label="Môn Học" />}
                                        MenuProps={MenuProps}
                                    >
                                        {listCourses.map((item, key) => (
                                            <MenuItem
                                                key={key}
                                                value={item._id}
                                                style={getStyles(item._id, theme)}
                                            >
                                                {item.code}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {formik.errors.course_id && formik.touched.course_id && (<div className="form-error mt-2">{formik.errors.course_id}</div>)}

                            </Grid>

                            <Grid className='layout-children-content-item'>
                                <FormControl fullWidth>
                                    <Typography variant="h6" gutterBottom>Câu hỏi (*)</Typography>
                                    <TextareaAutosize 
                                        className='layout-children-content-item-textarea'
                                        value={formik.values.question}
                                        name='question'
                                        onChange={formik.handleChange}
                                    ></TextareaAutosize>
                                </FormControl>
                                {formik.errors.question && formik.touched.question && (<div className="form-error mt-2">{formik.errors.question}</div>)}

                            </Grid>

                            <Grid className='layout-children-content-item'>
                                <FormControl fullWidth>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                    >
                                        Bạn đã thử cách gì để tìm kiếm câu trả lời? (*)
                                    </Typography>
                                    <TextareaAutosize
                                        className='layout-children-content-item-textarea'
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        name='description'
                                    ></TextareaAutosize>
                                    {formik.errors.description && formik.touched.description && (<div className="form-error mt-2">{formik.errors.description}</div>)}

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
                                <Button color='error' variant='outlined' onClick={formik.handleSubmit}>
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