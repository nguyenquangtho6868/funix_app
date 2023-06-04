import { Outlet, useNavigate,Link } from "react-router-dom";
import { useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavbarComponent from "./Navbar";
import '../css/home.css'

function HomeComponent() {

  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = localStorage.getItem('token');
    if(!checkToken) {
      alert('You must to login!');
      navigate('/')
    }
  },[])
  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/')
  }
  return (
    <div className="home row">
      <NavbarComponent/>
      <div className="col-2 home-left sidebar dashboard-header">
        <div className="main sidebar-item">
          <div className="main-title pt-2 pb-2"><h5>MAIN</h5></div>
          <Link to={'/home/'} className="main-item-link">
            <div className="main-item">
                <AccountCircleIcon/>
                <h6 className="ml-2">Users</h6>
            </div>
          </Link>
        </div>
      </div>

      <div className="col-10 home-right dashboard-header">
        <div className="top"></div>
        <Outlet/>
      </div>
    </div>
  );
}

export default HomeComponent;