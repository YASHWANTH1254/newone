import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css'; 

function TaskForm({ onCreateTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newTask = { title, description };
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addTasks`, newTask);
      onCreateTask(newTask);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="taskTitle" className="form-label">
          Title:
        </label>
        <input
          type="text"
          className="form-input"
          id="taskTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="taskDescription" className="form-label">
          Description:
        </label>
        <textarea
          className="form-input"
          id="taskDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="form-button">
        SUBMIT TASK
      </button>
    </form>
  );
}

export default TaskForm;
