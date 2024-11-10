const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Badal1302@', // Make sure to handle sensitive data properly
    database: 'todo',
});

db.connect((err) => {
    if (err) {
        console.log("Error connecting to the database", err.message);
        process.exit(1);
    } else {
        console.log("Database Connected");
    }
});

// Get all tasks
app.get('/tasks', (req, res) => {
    db.query("SELECT * FROM task", (err, result) => {
        if (err) {
            console.error("Error fetching tasks:", err);
            return res.status(500).json({ message: "Error fetching tasks." });
        }
        res.json(result);
    });
});

// Add a new task
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required." });
    }

    db.query("INSERT INTO task SET ?", { title }, (err, result) => {
        if (err) {
            console.error("Error adding task:", err);
            return res.status(500).json({ message: "Error adding task." });
        }
        res.json({ id: result.insertId, title });
    });
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM task WHERE id=?", id, (err) => {
        if (err) {
            console.error("Error deleting task:", err);
            return res.status(500).json({ message: "Error deleting task." });
        }
        res.json({ message: `Task with ID ${id} deleted` });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
