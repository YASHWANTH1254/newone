import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:4000/login', { email, password })
      .then((response) => {
        if (response.data.role === 'admin') {
          localStorage.setItem('userId', response.data.id);
          localStorage.setItem('userName', response.data.name);
          navigate('/admin');
        } else if (response.data.role === 'user') {
          localStorage.setItem('userId', response.data.id);
          localStorage.setItem('userName', response.data.name);
          navigate('/user');
        } else {
          setLoginError('Invalid username or password');
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginError('Invalid username or password');
        setEmail('');
        setPassword('');
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-header">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label htmlFor="loginUsername" className="form-label">Username:</label>
            <input
              type="text"
              className="form-input"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="loginPassword" className="form-label">Password:</label>
            <input
              type="password"
              className="form-input"
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">Login</button>
          {loginError && <p className="error-message">{loginError}</p>}
        </form>
        <div className="card-footer text-center">
          <p>
            Don't have an account? <a href="/signup">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
