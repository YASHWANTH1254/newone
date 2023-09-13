import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import axios from 'axios';
import './ContentArea.css'; // Import your CSS file

function ContentArea({ isCreateTaskOpen, userId, isAdmin, isUser, userName }) {
  const [tasks, setTasks] = useState([]);
  const userTasks = tasks.filter(task => task.user_id === userId && task.status === 'tagged');
  const userTasks1 = tasks.filter(task => task.user_id === userId && task.status === 'qc');
  const userTasks2 = tasks.filter(task => task.user_id === userId && task.status === 'completed');
  const CreatedTasks = tasks.filter(task => task.status === 'created');
  const ReadyTasks = tasks.filter(task => task.status === 'ready');
  const taggedTasks = tasks.filter(task => task.status === 'tagged');
  const qcTasks = tasks.filter(task => task.status === 'qc');
  const doneTasks = tasks.filter(task => task.status === 'completed');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getCreatedTasks`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleReadyTask = (taskId, userId) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/readyTask`, { taskId, userId })
      .then(response => {
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, status: 'ready' };
          }
          return task;
        });
        setTasks(updatedTasks);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleAcceptTask = (taskId, userId, userName) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/acceptTask`, { taskId, userId, userName })
      .then(response => {
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, status: 'tagged' };
          }
          return task;
        });
        setTasks(updatedTasks);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSendQc = (taskId) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendqc`, { taskId })
      .then(response => {
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, status: 'qc' };
          }
          return task;
        });
        setTasks(updatedTasks);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDone = (taskId) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/done`, { taskId })
      .then(response => {
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, status: 'completed' };
          }
          return task;
        });
        setTasks(updatedTasks);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="contentArea">
      <div className="tasksColumn">
        <h2>Upload Tasks</h2>
        {CreatedTasks.map((task, index) => (
          <div key={index} className="task">
            <div>
              <strong>Title:</strong> {task.title}
            </div>
            {!isAdmin && <button className="button" onClick={() => handleReadyTask(task.id, userId)}>Ready</button>}
          </div>
        ))}
      </div>
      <div className="tasksColumn">
        <h2>Ready To Tag</h2>
        {ReadyTasks.map((task, index) => (
          <div key={index} className="task">
            <div>
              <strong>Title:</strong> {task.title}
            </div>
            {isAdmin && <button className="button" onClick={() => handleAcceptTask(task.id, userId, userName)}>Accept</button>}
          </div>
        ))}
      </div>
      <div className="tasksColumn">
        <h2>{isAdmin ? 'Tagging' : 'Tagged'}</h2>
        {(isAdmin ? userTasks : taggedTasks).map((task, index) => (
          <div key={index} className="task">
            <div>
              <strong>Title:</strong> {task.title}
            </div>
            <div className="userInfo">
              <strong className="mr-1">User ID :</strong> {task.user_id}
              <div className="avatar">{task.User ? task.User.charAt(0).toUpperCase() : 'N'}</div>
            </div>
            {isAdmin && <button className="button" onClick={() => handleSendQc(task.id)}>Send to QC</button>}
          </div>
        ))}
      </div>
      <div className="tasksColumn">
        <h2>Qc</h2>
        {(isAdmin ? userTasks1 : qcTasks).map((task, index) => (
          <div key={index} className="task">
            <div>
              <strong>Title:</strong> {task.title}
            </div>
            <div className="userInfo">
              <strong className="mr-1">User ID :</strong> {task.user_id}
              <div className="avatar">{task.User ? task.User.charAt(0).toUpperCase() : 'N'}</div>
            </div>
            {isAdmin && <button className="button" onClick={() => handleDone(task.id)}>Done</button>}
          </div>
        ))}
      </div>
      <div className="tasksColumn">
        <h2>Completed</h2>
        {(isAdmin ? userTasks2 : doneTasks).map((task, index) => (
          <div key={index} className="task">
            <div>
              <strong>Title:</strong> {task.title}
            </div>
            <div className="userInfo">
              <strong className="mr-1">User ID :</strong> {task.user_id}
              <div className="avatar">{task.User ? task.User.charAt(0).toUpperCase() : 'N'}</div>
            </div>
          </div>
        ))}
      </div>
      {isCreateTaskOpen && <TaskForm />}
    </div>
  );
}

export default ContentArea;
