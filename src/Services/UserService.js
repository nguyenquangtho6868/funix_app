import { API_URL } from '../Constants/ApiConstant'

export function getUserDetail(callback, id, course_id) {
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/get-user-detail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({id,course_id})
    })
    .then(res => res.json())
    .then(callback);
}