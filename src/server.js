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

// Database setup
const { Client } = require('pg');
const db = new Client({
    connectionString: 'your-database-connection-string',
});
db.connect()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Error connecting to the database', err);
    });

// Initialize passport for OAuth
app.use(passport.initialize());

// Apply the authMiddleware to routes that require JWT authentication
app.use('/api', protectedRoute);

// Use the authentication middleware for routes that require authentication
app.use('/api/protected', authMiddleware, protectedRouteHandler);

// Define your API routes here
app.use('/api/auth', require('./routes/authRoutes')); // Authentication routes
app.use('/api/tasks', require('./routes/tasks')); // Your resource routes (e.g., tasks)


// Use the error handling middleware at the end
app.use(errorMiddleware);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
