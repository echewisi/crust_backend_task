// Import required libraries
const express = require('express');
const corsMiddleware = require('./src/middleware/corsMiddleware');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const passport = require('passport'); // For OAuth
const morgan = require('morgan');
const specs = require('./src/swaggerConfig');
const swaggerUI = require('swagger-ui-express');
const authMiddleware = require('./src/middleware/authMiddleware');
const errorMiddleware = require('./src/middleware/errorMiddleware');
const protectedRoute = require('./src/routes/protectedRoutes'); // Import your protected route


// Initialize Express app
const app = express();

// Use the corsMiddleware for CORS handling
app.use(corsMiddleware());

// Serve swaggerUI documentation:
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// Initialize passport for OAuth
app.use(passport.initialize());



// Middleware
app.use(bodyParser.json());

// Apply the authMiddleware to routes that require JWT authentication
app.use('/api', protectedRoute);

// Use the authentication middleware for routes that require authentication
app.use('/api/protected', authMiddleware, protectedRoute);

// Define your API routes here
app.use('/api/auth', require('./src/routes/authRoutes')); // Authentication routes
app.use('/api/tasks', require('./src/routes/taskRoutes')); // Resource routes (tasks)

// Use the error handling middleware at the end
app.use(errorMiddleware);

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
