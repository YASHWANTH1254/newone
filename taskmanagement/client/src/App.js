import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login';
import SignupForm from './components/Signup';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
         <Route path='/' element={<LoginForm />}/>
         <Route path='/signup' element={<SignupForm />}/>
         <Route path='/admin' element={<AdminPage />}/>
         <Route path='/user' element={<UserPage />}/>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
