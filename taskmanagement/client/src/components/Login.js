import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { initializeApp } from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(""); 
  const navigate = useNavigate();

  const firebaseConfig = {
    apiKey: "AIzaSyCMoGBRVBbFapzxkZUk-lWPUl8lb1Eyqmw",
    authDomain: "my-react-8156f.firebaseapp.com",
    projectId: "my-react-8156f",
    storageBucket: "my-react-8156f.appspot.com",
    messagingSenderId: "845136029990",
    appId: "1:845136029990:web:ca4797941207e2d8c639e7",
    measurementId: "G-YRVK546QHZ"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User info:', user.displayName, user.email);

      const response = await axios.post('http://localhost:4000/checkUserRole', {
        email: user.email
      });

      if (response.data.role === 'admin') {

        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('userName', response.data.name);
        navigate('/admin');
      } else if (response.data.role === 'user') {

        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('userName', response.data.name);
        navigate('/user');
      }
    } catch (error) {
      console.error(error);
      setLoginError('Email was not Registered');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, { email, password })
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
          <button type="submit" className="btn-primary">Login</button> <br/>
          <center><button onClick={handleGoogleLogin} className="btn btn-success">Login With Google</button></center>
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
