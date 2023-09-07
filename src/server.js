// Import required libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv= require('dotenv').config()
const passport = require('passport'); // For OAuth
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const protectedRoute = require('./routes/protectedRoute'); // Import your protected route
const corsMiddleware = require('./middleware/corsMiddleware');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());



// Initialize passport for OAuth
app.use(passport.initialize());

// Apply the authMiddleware to routes that require JWT authentication
app.use('/api', protectedRoute);

// Use the authentication middleware for routes that require authentication
app.use('/api/protected', authMiddleware, protectedRouteHandler);

// Define your API routes here
app.use('/api/auth', require('./routes/authRoutes')); // Authentication routes
app.use('/api/tasks', require('./routes/taskRoutes')); // resource routes (tasks)


// Use the error handling middleware at the end
app.use(errorMiddleware);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
