// Import required libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv= require('dotenv').config()
const passport = require('passport'); // For OAuth
const morgan= require('morgan')
const specs= require('./src/swaggerConfig')
const swaggerUI= require('swagger-ui-express')
const authMiddleware = require('./src/middleware/authMiddleware');
const errorMiddleware = require('./src/middleware/errorMiddleware');
const protectedRoute = require('./src/routes/protectedRoutes'); // Import your protected route
const corsMiddleware = require('./src/middleware/corsMiddleware');

// Initialize Express app
const app = express();

//corsmiddleware
app.use(corsMiddleware()); // Correct the usage

// Middleware
app.use(bodyParser.json());
app.use(cors());



//serve swaggerUI documentation:
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));


// Initialize passport for OAuth
app.use(passport.initialize());

// Apply the authMiddleware to routes that require JWT authentication
app.use('/api', protectedRoute);

// Use the authentication middleware for routes that require authentication
app.use('/api/protected', authMiddleware, protectedRoute);

// Define your API routes here
app.use('/api/auth', require('./src/routes/authRoutes')); // Authentication routes
app.use('/api/tasks', require('./src/routes/taskRoutes')); // resource routes (tasks)


// Use the error handling middleware at the end
app.use(errorMiddleware);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
