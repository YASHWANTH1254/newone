import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ onCreateTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newTask = { title, description };
    try {
      await axios.post('http://localhost:4000/addTasks', newTask);
      onCreateTask(newTask);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '665px',textAlign:'center',marginLeft:'350px', padding: '20px', background: '#f0f0f0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="taskTitle" style={{ fontWeight: 'bold' }}>Title:</label>
        <input
          type="text"
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          id="taskTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="taskDescription" style={{ fontWeight: 'bold' }}>Description:</label>
        <textarea
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          id="taskDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        SUBMIT TASK
      </button>
    </form>
  );
}

export default TaskForm;
