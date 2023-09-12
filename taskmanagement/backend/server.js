// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "manager"
});






app.post('/addUsers', (req, res) => {
  const formData = req.body;

  db.query('INSERT INTO users SET ?', formData, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error inserting data', error: err.message });
      return;
    }
    res.json({ message: 'Data inserted successfully' });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT id, role, name FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error authenticating user' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const userRole = results[0].role;
    const userId = results[0].id;
    const userName = results[0].name;

    res.json({ role: userRole, id: userId, name: userName });
  });
});

app.post('/addTasks', (req, res) => {
  const { title, description } = req.body;

  db.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error inserting task', error: err.message });
      return;
    }
    res.json({ message: 'Task added successfully' });
  });
});

app.get('/getCreatedTasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching pending tasks' });
    } else {
      res.json(results);
    }
  });
});

app.post('/readyTask', (req, res) => {
  const { taskId, userId } = req.body;

  db.query('UPDATE tasks SET status = ?, user_id = ? WHERE id = ?', ['ready', userId, taskId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error ready task' });
    } else {
      res.json({ message: 'Task ready successfully' });
    }
  });
});

app.post('/acceptTask', (req, res) => {
  const { taskId, userId, userName } = req.body;

  db.query('UPDATE tasks SET status = ?, user_id = ?, User = ? WHERE id = ?', ['tagged', userId, userName, taskId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error tagged task' });
    } else {
      res.json({ message: 'Task tagged successfully' });
    }
  });
});

app.post('/sendqc', (req, res) => {
  const { taskId } = req.body;

  db.query('UPDATE tasks SET status = ? WHERE id = ?', ['qc', taskId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error accepting task' });
    } else {
      res.json({ message: 'Task accepted successfully' });
    }
  });
});


app.post('/done', (req, res) => {
  const { taskId } = req.body;

  db.query('UPDATE tasks SET status = ? WHERE id = ?', ['completed', taskId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error completing task' });
    } else {
      res.json({ message: 'Task completed successfully' });
    }
  });
});

app.listen(4000, () => {
  console.log("Running backend server");
});
