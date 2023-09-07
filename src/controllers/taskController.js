const Task = require('../models/task'); // Import your Task model

// Controller for creating a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Create a new task in the database
        const newTask = await Task.create({
            title,
            description,
            userId: req.user.id, // Assuming you have a user ID associated with tasks
        });

        res.status(201).json(newTask); // Respond with the created task
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller for getting all tasks
exports.getAllTasks = async (req, res) => {
    try {
        // Fetch all tasks associated with the authenticated user
        const tasks = await Task.findAll({ where: { userId: req.user.id } });

        res.json(tasks); // Respond with the list of tasks
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller for getting a single task by ID
exports.getTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId;

        // Fetch a task by ID associated with the authenticated user
        const task = await Task.findOne({
            where: { id: taskId, userId: req.user.id },
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task); // Respond with the task
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller for updating a task by ID
exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const { title, description } = req.body;

        // Update a task by ID associated with the authenticated user
        const updatedTask = await Task.update(
            { title, description },
            { where: { id: taskId, userId: req.user.id } }
        );

        if (updatedTask[0] === 0) {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }

        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller for deleting a task by ID
exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;

        // Delete a task by ID associated with the authenticated user
        const deletedTaskCount = await Task.destroy({
            where: { id: taskId, userId: req.user.id },
        });

        if (deletedTaskCount === 0) {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
