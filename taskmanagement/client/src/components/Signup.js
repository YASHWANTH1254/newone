import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';

function SignupForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = (event) => {
    event.preventDefault();

    if (values.name !== '' && values.email !== '' && values.password !== '' && values.role !== '') {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/addUsers`, values)
        .then((res) => {
          console.log(res);
          setRegistrationSuccess(true);
          setValues({
            name: '',
            email: '',
            password: '',
            role: 'user',
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-header">Sign Up</h2>
        {registrationSuccess ? (
          <div className="signup-alert alert alert-success" role="alert">
            Registration Successful! You can now Login.
          </div>
        ) : (
          <form onSubmit={handleSignup}>
            <div className="input-container">
              <label htmlFor="signupName" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-input"
                name="name"
                value={values.name}
                onChange={handleInput}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="text"
                className="form-input"
                name="email"
                value={values.email}
                onChange={handleInput}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-input"
                name="password"
                value={values.password}
                onChange={handleInput}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="role" className="form-label">
                Role:
              </label>
              <select
                className="form-input"
                name="role"
                value={values.role}
                onChange={handleInput}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn-primary">
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SignupForm;
