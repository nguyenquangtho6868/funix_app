import React, {useState,useEffect, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup } from "react-bootstrap";
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import './login.css';
import firebase,{ auth } from '../../Firebase/Config';
import Grid from '@mui/material/Grid';
import { loginPage } from "../../Services/LoginService";
import { AuthContext } from "../../Context/AuthLogin";


// const gmailProvider = new firebase.auth.GoogleAuthProvider();

function LoginComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoading } = useContext(AuthContext);

  const callbacklogin = (data) => {
    if(data.statusCode === 200) {
      toast.success('Đăng nhập thành công!');
      setTimeout(() => {
        navigate('/home');
        setIsLoading(false);
      }, 300);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('username', data.username);
      localStorage.setItem('role', data.role);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        toast.error('Tên đăng nhập hoặc mật khẩu không đúng!');
        navigate('/');
      }, 300);
    }
  }
  
  function handleLogin() {
    // firebase.auth().signInWithPopup(gmailProvider);
    setIsLoading(true);
    loginPage(callbacklogin, {
      email: email,
      password: password
    })
  };
   
    return (
      <div className="login">
        <div className="login-box">
          <Grid container>
            <Grid item xs={12} md={12} lg={7} className="login-box-left">
              <img  className="login-box-left-img" src={require('../../assets/img/logo-funix.png')} alt="" />
            </Grid>
            <Grid item xs={12} md={12} lg={5} className="login-box-right">  
              <Form className="form-middle">
                <h1>Login</h1>
                <FormGroup className="form-middle-group">
                  <TextField 
                      id="filled-basic" 
                      label="Email" 
                      variant="filled" 
                      className='form-input-add input-login'
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form-middle-group">
                  <TextField 
                      id="filled-basic" 
                      label="Password"
                      type="password"
                      variant="filled" 
                      className='form-input-add input-login'
                      onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <div className="login-submit">
                  <div className="button-submit" onClick={handleLogin}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    submit
                  </div>
                </div>
                <div className="text-register">
                </div>
              </Form>
            </Grid>
          </Grid>
        </div>
        
      </div>
    );
}

export default LoginComponent;