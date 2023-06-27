import { API_URL } from '../Constants/ApiConstant'

export function getCourses(callback) {
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/get-list-course`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
      .then(res => res.json())
      .then(callback);
}

export function getCourseDetail(callback,id) {
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/get-list-course-detail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({id})
    })
      .then(res => res.json())
      .then(callback);
}