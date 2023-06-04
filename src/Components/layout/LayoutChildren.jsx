import { useState, useContext} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './layout.css'
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { List, ListItem, ListItemIcon } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


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

const courses = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const mentors = [
    {
        name: 'Vũ Duy',
        age: 18
    },
    {
        name: 'Phú Chu',
        age: 18
    },
    {
        name: 'Vương Đản',
        age: 18
    },
    {
        name: 'Hàn Mộc',
        age: 18
    },
    {
        name: 'Vũ Duy',
        age: 18
    },
    {
        name: 'Phú Chu',
        age: 18
    },
    {
        name: 'Vương Đản',
        age: 18
    },
    {
        name: 'Hàn Mộc',
        age: 18
    },
    {
        name: 'Vũ Duy',
        age: 18
    },
    {
        name: 'Phú Chu',
        age: 18
    },
    {
        name: 'Vương Đản',
        age: 18
    },
    {
        name: 'Hàn Mộc',
        age: 18
    }
  ];


function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}
  
function LayoutChildrenComponent() {
    const [value, setValue] = useState(0);
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
  return (
    <div className='layout-children'>
        <Grid container className='layout-children-grid'>
            <Grid  item xs={6} className='layout-children-left'>
                <Grid className='layout-children-left-content'>
                    <Grid className='layout-children-middle'>
                        <Typography variant="h3" gutterBottom>Tùy Chọn Mentor</Typography>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-name-label">Môn Học</InputLabel>
                            <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Môn Học" />}
                            MenuProps={MenuProps}
                            >
                            {courses.map((name) => (
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
                        <List className='layout-children-list-mentor'>
                            {
                                mentors.map((obj,key) => {
                                    return (
                                    <ListItem button onClick={moveToChatRoom} className='layout-nav-list-item'> 
                                        <ListItemIcon 
                                            className='text-center-flex'
                                            key={key}
                                        > 
                                            <AccountCircleIcon 
                                            fontSize="large" 
                                            color="secondary" 
                                            />
                                            <Typography ml={1} variant="h5" gutterBottom>
                                                {obj.name}
                                            </Typography>
                                        </ListItemIcon>
                                    </ListItem>
                                    )
                                })
                            }
                        </List>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6} className='layout-children-left'>
                <Grid className='layout-children-right-content'>
                    <Grid className='layout-children-middle'>
                        <Typography variant="h3" gutterBottom>Tìm Nhanh Mentor</Typography>
                        <Button variant="contained" color="error" onClick={moveToChatRoom}>
                            Tìm Mentor
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>
  )
};

export default LayoutChildrenComponent;