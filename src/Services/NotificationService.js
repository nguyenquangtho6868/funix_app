import { API_URL } from '../Constants/ApiConstant'

export function getlistNotification(callback, id) {
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/get-list-notification`, {
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
