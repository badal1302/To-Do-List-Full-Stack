import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    // Fetch tasks from the server
    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:5000/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Add a new task
    const addTask = async () => {
        try {
            const response = await axios.post("http://localhost:5000/tasks", { title });
            setTasks([...tasks, response.data]);
            setTitle("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    // Delete a task
    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${id}`);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Fetch tasks when the component mounts
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h1>To-Do List</h1>
            <input
                type="text"
                placeholder="New Task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title}
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
