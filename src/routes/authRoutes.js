// routes/authRoutes.js
const express = require('express');
const passport = require('../config/oauth.config'); // Import the GitHub OAuth configuration
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const authController = require('../controllers/authController');
const oauthMiddleware = require('../middleware/oauthMiddleware');
const router = express.Router();


// User registration route
router.post(
    '/register',
    [
        check('username', 'Username is required').notEmpty(),
        check('email', 'Valid email is required').isEmail(),
        check('password', 'Password must be at least 6 characters long').isLength({
        min: 6,
    }),
    ],
    validationMiddleware,
    authController.register
);

  // User login route
    router.post('/login', authController.login);

// GitHub authentication route
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback route
router.get(
    '/github/callback',
        passport.authenticate('github', { failureRedirect: '/login' }),
        authController.oauthLogin,
    (req, res) => {
    // Successful authentication, you can redirect or respond as needed
    res.redirect('/dashboard'); // Redirect to the dashboard or another page
    }
);

module.exports = router;
