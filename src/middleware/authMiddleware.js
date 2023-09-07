// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config'); // Your configuration file

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded.user; // Attach the user object to the request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
