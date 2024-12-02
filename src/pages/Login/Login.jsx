import React, { useRef, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'; // นำเข้า Link
import { verifyUser } from '../../data/user';
import './Login.css';

function Login({ setToken, setRole, setUsername, setAvatar }) {
  const userRef = useRef();
  const passRef = useRef();
  const [showPassword, setShowPassword] = useState(false); // State สำหรับแสดง/ซ่อนรหัสผ่าน

  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const handleLogin = () => {
    const user = userRef.current.value.trim();
    const pass = passRef.current.value.trim();
    userRef.current.value = '';
    passRef.current.value = '';

    const userInfo = verifyUser(user, pass);

    if (!userInfo) {
      alert('Wrong username or password');
      userRef.current.focus();
    } else {
      setToken(userInfo.token);
      setRole(userInfo.role);
      setUsername(userInfo.name);
      setAvatar(userInfo.avatar); // ตั้ง avatar
    }
  };

  return (
    <div className="login-page">
      <div className="background-image"></div>
      <div className="logo-container">
        <img src="/metthier2.png" alt="Logo" className="logo" />
      </div>
      <div className="login-container">
        <h2 className="move-login-h2">LOGIN</h2>
        <Form.Group controlId="username" className="form-group-horizontal">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type your user name"
            ref={userRef}
          />
        </Form.Group>
        <Form.Group controlId="password" className="form-group-horizontal">
          <Form.Label>Password</Form.Label>
          <div className="password-wrapper">
            <Form.Control
              type={showPassword ? 'text' : 'password'} // สลับระหว่าง text และ password
              placeholder="Type your password"
              ref={passRef}
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="bi bi-eye-slash"></i> // ไอคอนปิดตา
              ) : (
                <i className="bi bi-eye"></i> // ไอคอนเปิดตา
              )}
            </button>
          </div>
        </Form.Group>
        <button className="login-button" onClick={handleLogin}>
          LOGIN
        </button>
        <a href="#/fomereport">
          <p className="forgot-password">แจ้งปัญหา</p>
        </a>
      </div>
    </div>
  );
}

export default Login;
