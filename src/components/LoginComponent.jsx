import React, {useEffect, useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup } from "react-bootstrap";
import { toast } from 'react-toastify';
import '../css/login.css';
import TextField from '@mui/material/TextField';
import { loginPage } from "../Services/LoginService";
import { AuthContext } from "../Context/AuthProvider";

function LoginComponent() {
    const navigate = useNavigate();
    const { setIsLoading } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const callbacklogin = (data) => {
      if(data.statusCode === 200) {
        if(data.role === 'ADMIN') {
          toast.success('Đăng nhập thành công!');
          setTimeout(() => {
            navigate('/home');
            setIsLoading(false);
          }, 300);
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username);
          localStorage.setItem('role', data.role);
        } else {
          setTimeout(() => {
            toast.error('Bạn không có quyền truy cập!');
            setIsLoading(false);
            navigate('/');
          }, 300);
        }
      } else {
          setTimeout(() => {
            setIsLoading(false);
            toast.error('Tên đăng nhập hoặc mật khẩu không đúng!');
            navigate('/');
          }, 300);
      }
    }

    function handleLogin() {
      setIsLoading(true);
      loginPage(callbacklogin, {
        email: email,
        password: password
      })
    };

    useEffect(() => {
      setIsLoading(false);
      const token = localStorage.getItem('token');
      if(token) navigate('/home');
    });
  
    return (
      <div className="login">
        <div className="login-box">
            <Form className="form-middle">
              <h1>Login</h1>
              <FormGroup className="form-middle-group">
                {/* <label className="form-middle-label" htmlFor="">Username</label> */}
                <TextField 
                    id="filled-basic" 
                    label="Email" 
                    variant="filled" 
                    className='form-input-add input-login'
                    onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form-middle-group">
                {/* <label className="form-middle-label" htmlFor="">Password</label> */}
                <TextField 
                    id="filled-basic" 
                    label="Password"
                    type="password"
                    variant="filled" 
                    className='form-input-add input-login'
                    onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <div className="button-submit" onClick={handleLogin}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                submit
              </div>
              <div className="text-register">
              </div>
            </Form>
        </div>
      </div>
    );
}

export default LoginComponent;