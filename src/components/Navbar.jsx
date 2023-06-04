import { useNavigate,Link } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../Context/AuthProvider";
import '../css/navbar.css';

function NavbarComponent() {

    const {username} = useContext(AuthContext);
    const navigate = useNavigate();
        
    const clearUser = () => {
        localStorage.clear();
        navigate('/');
    };

  return (
    <div className='header'>
          <div className="header-name header-left">
            <h5 className="header-name-item">Dashboard</h5>
          </div>

          <div className='header-logo'>ADMIN</div>

          <div className="header-user header-right">
            <div className="header-user-item header-right-flex">
              <div className="header-user-item-icon"><i class="fa-regular fa-circle-user"></i></div>
              <p className="header-user-item-name">{username}</p>
            </div>
            <div className="header-user-item " onClick={clearUser}>
              <p className="header-user-item-logout">Logout</p>
            </div>
          </div>
    </div>
  );
}

export default NavbarComponent;