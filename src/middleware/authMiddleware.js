const jwt = require('jsonwebtoken');
const config = require('../config/jwtconfig'); 

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }


    const tokenWithoutPrefix = token.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(tokenWithoutPrefix, config.jwtSecret);
        req.user = decoded.user; // Attach the user object to the request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
