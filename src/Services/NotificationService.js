import { API_URL } from '../Constants/ApiConstant'

export function getlistNotification(callback, id) {
    fetch(`${API_URL}/get-list-notification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
    })
      .then(res => res.json())
      .then(callback);
}
