import React, { createContext, useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();
function AuthLoginProvider({children}) {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isOutlet, setIsOutlet] = useState(false);

    useEffect(() => {
        
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