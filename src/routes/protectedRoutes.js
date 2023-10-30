const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route that requires JWT authentication
router.get('/protected-resource', authMiddleware, (req, res) => {
  // The user is authenticated; you can access req.user
    res.json({ message: 'Access granted', user: req.user });
});

module.exports = router;

