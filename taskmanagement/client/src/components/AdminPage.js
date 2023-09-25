import React, { useState } from 'react';
import ContentArea from './ContentArea';
import TaskForm from './TaskForm';
import './admin.css';

function AdminPage() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  const handleCreateTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setIsCreateTaskOpen(false);
  };

  const isAdmin = false;
  const isUser = true;

  return (
    <div className="admin-page">
      <div className="nav-bar">
        <h1>ADMIN PAGE</h1>
        <div className="admin-name">
          Welcome, {userName}
        </div>
        <button
          className="logout-button"
          onClick={() => window.location.href = '/'}
        >
          Log Out
        </button>
      </div>
      <br /><br />
      <button
        onClick={() => setIsCreateTaskOpen(true)}
        className="create-task-button"
      >
        Create Task
      </button>
      <br /><br />

      <div className="content">
        {isCreateTaskOpen ? (
          <TaskForm onCreateTask={handleCreateTask} onClose={() => setIsCreateTaskOpen(false)} />
        ) : (
          <ContentArea tasks={tasks} isAdmin={isAdmin} isUser={isUser} userId={userId} />
        )}
      </div>
    </div>
  );
}

export default AdminPage;
