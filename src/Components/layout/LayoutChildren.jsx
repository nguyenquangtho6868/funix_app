
import { useEffect } from 'react';
import LayoutOfMentorComponent from './LayoutOfMentor';
import LayoutOfStudentComponent from './layoutOfStudent';
import { API_URL } from '../../Constants/ApiConstant';

import io from 'socket.io-client';

const socket = io(API_URL);

function LayoutChildrenComponent() {
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        socket.emit("addUser", userId);
    }, [])
    return (
        <>
            {
                (role === 'ADMIN' || role === 'MENTOR') && <LayoutOfMentorComponent /> 
            }
            {
                role === 'STUDENT' && <LayoutOfStudentComponent/>
            }
        </>
    )
};

export default LayoutChildrenComponent;