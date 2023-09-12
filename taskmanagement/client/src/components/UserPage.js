import React, { useState, useEffect } from 'react';
import ContentArea from './ContentArea';
import './userpage.css';

const UserPage = () => {
  const userId = parseInt(localStorage.getItem('userId'));
  const userName = localStorage.getItem('userName');
  const [tasks, setTasks] = useState([]);
  const isUser = false;
  const isAdmin = true;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:4000/getCreatedTasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const userTasks = tasks.filter((task) => task.user_id === userId);

  return (
    <div className="user-page">
      <div className="navbar">
        <div className="logo">USER PAGE</div>
        <div className="admin-name">Welcome, {userName}</div>
        <button
          className="button logout-button"
          onClick={() => window.location.href = '/'}
        >
          Log Out
        </button>
      </div>
      <div className="content">
        <ContentArea tasks={userTasks} userId={userId} userName={userName} isAdmin={isAdmin} isUser={isUser} />
      </div>
    </div>
  );
};

export default UserPage;
