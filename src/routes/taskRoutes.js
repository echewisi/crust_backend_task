// routes/taskRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');

const router = express.Router();

// Create a new task
router.post('api/tasks/create', authMiddleware, taskController.createTask);

// Get all tasks
router.get('api/tasks/list', authMiddleware, taskController.getAllTasks);

// Get a single task by ID
router.get('api/tasks/:taskId', authMiddleware, taskController.getTaskById);

// Update a task by ID
router.put('api/tasks/:taskId', authMiddleware, taskController.updateTask);

// Delete a task by ID
router.delete('api/tasks/:taskId', authMiddleware, taskController.deleteTask);

module.exports = router;
