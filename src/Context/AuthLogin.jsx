import React, { createContext, useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import firebase,{ auth } from '../../src/Firebase/Config';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();
function AuthLoginProvider({children}) {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isOutlet, setIsOutlet] = useState(false);

    // useEffect(() => {
    //   const unsubcribe = auth.onAuthStateChanged((user) => {
    //     if(user) {
    //       setIsLoading(false);
    //       setUser({
    //         photoURL: user.multiFactor.user.photoURL,
    //         displayName: user.multiFactor.user.displayName,
    //         uid: user.multiFactor.user.uid,
    //         providerId: user.multiFactor.user.providerId
    //       })
    //       navigate('/chat-room');
    //       return
    //     } else {
    //       setIsLoading(false);
    //       navigate('/');
    //     }
    //   });
        
    //   return () => {
    //     unsubcribe();
    //   }
    // }, [navigate]);
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