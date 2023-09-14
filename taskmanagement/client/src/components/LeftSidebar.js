import React from 'react';
import './LeftSidebar.css'; 

function LeftSidebar({ adminName, onCreateTask }) {
  return (
    <div className="container"> 
      <div className="navbar"> 
        <div className="avatar">{adminName.charAt(0).toUpperCase()}</div>
        <div className="adminName">{adminName}</div>
        <button onClick={onCreateTask} className="createTaskButton"> 
          Create Task
        </button>
        <a href="/">
          <button className="createLogButton customLogButton">
            Logout
          </button>
        </a>
      </div>
    </div>
  );
}

export default LeftSidebar;
