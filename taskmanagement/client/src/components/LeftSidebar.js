import React from 'react';
import './LeftSidebar.css'; // Import the custom CSS file

function LeftSidebar({ adminName, onCreateTask }) {
  return (
    <div className="container"> {/* Use className instead of style */}
      <div className="navbar"> {/* Use className instead of style */}
        <div className="avatar">{adminName.charAt(0).toUpperCase()}</div>
        <div className="adminName">{adminName}</div>
        <button onClick={onCreateTask} className="createTaskButton"> {/* Use className instead of style */}
          Create Task
        </button>
        <a href="/">
          <button className="createLogButton customLogButton"> {/* Use className instead of style */}
            Logout
          </button>
        </a>
      </div>
    </div>
  );
}

export default LeftSidebar;
