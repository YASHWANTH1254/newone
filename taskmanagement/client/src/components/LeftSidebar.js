import React from 'react';

function LeftSidebar({ adminName, onCreateTask }) {
  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
       <div style={styles.avatar}>{adminName.charAt(0).toUpperCase()}</div>
       <div style={styles.adminName}>
        {adminName}
      </div>
      <button onClick={onCreateTask} style={styles.createTaskButton}>
        Create Task
      </button>
      <a href='/'>
      <button style={styles.createLogButton}>
        Logout
      </button></a>
    </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
  },
  navbar: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#007bff',
    padding: '20px',
    alignItems: 'center',
    color: 'white',
  },
  createTaskButton: {
    marginTop: '20px',
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: '1px solid white',
  },
  adminName: {
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '10px',
  },
  avatar: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    backgroundColor: 'white',
    color: '#007bff', 
  },
  createLogButton: {
    marginTop: '20px',
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: '1px solid white',
  },
};

export default LeftSidebar;
