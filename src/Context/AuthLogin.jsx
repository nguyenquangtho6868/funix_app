import React, { createContext, useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { getRoomCheckUserId } from '../Services/RoomChatService';

export const AuthContext = createContext();
function AuthLoginProvider({children}) {

    const navigate = useNavigate();
    const userId  = localStorage.getItem('userId');
    const [isLoading, setIsLoading] = useState(false);
    const [isOutlet, setIsOutlet] = useState(false);

    useEffect(() => {
      getRoomCheckUserId((res) => {
        if(res.data) {
          navigate(`/chat-room/${res.data._id}`)
        }
      }, userId);
        
      return () => {
        
      }
    }, [navigate]);
  return (
    <AuthContext.Provider value={{setIsLoading, isOutlet, setIsOutlet}}>
        {isLoading? <div className="loading">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div> : children}
    </AuthContext.Provider>
  )
}

export default AuthLoginProvider;