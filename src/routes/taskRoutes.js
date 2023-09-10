// routes/taskRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: CRUD operations for tasks
 */

// Create a new task
/**
 * @swagger
 * /api/tasks/create:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: [] # Use Bearer authentication (JWT token)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *               description:
 *                 type: string
 *                 description: The description of the task (optional)
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized (missing or invalid JWT token)
 *       500:
 *         description: Server error
 */
router.post('/create', authMiddleware, taskController.createTask);

// Get all tasks

/**
 * @swagger
 * /api/tasks/list:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: [] # Use Bearer authentication (JWT token)
 *     responses:
 *       200:
 *         description: List of tasks
 *       401:
 *         description: Unauthorized (missing or invalid JWT token)
 *       500:
 *         description: Server error
 */
router.get('/list', authMiddleware, taskController.getAllTasks);

// Get a single task by ID
/**
 * @swagger
 * /api/tasks/{taskId}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: [] # Use Bearer authentication (JWT token)
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID of the task to retrieve
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       401:
 *         description: Unauthorized (missing or invalid JWT token)
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.get('/:taskId', authMiddleware, taskController.getTaskById);

// Update a task by ID
/**
 * @swagger
 * /api/tasks/{taskId}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: [] # Use Bearer authentication (JWT token)
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the task
 *               description:
 *                 type: string
 *                 description: The updated description of the task (optional)
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       401:
 *         description: Unauthorized (missing or invalid JWT token)
 *       404:
 *         description: Task not found or not authorized
 *       500:
 *         description: Server error
 */
router.put('/:taskId', authMiddleware, taskController.updateTask);

// Delete a task by ID
/**
 * @swagger
 * /api/tasks/{taskId}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: [] # Use Bearer authentication (JWT token)
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID of the task to delete
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized (missing or invalid JWT token)
 *       404:
 *         description: Task not found or not authorized
 *       500:
 *         description: Server error
 */
router.delete('/:taskId', authMiddleware, taskController.deleteTask);

module.exports = router;
