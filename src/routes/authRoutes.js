// routes/authRoutes.js
const express = require('express');
const passport = require('../config/oauth.config'); // Import the GitHub OAuth configuration
const router = express.Router();

// GitHub authentication route
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback route
router.get(
    '/github/callback',
        passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
    // Successful authentication, you can redirect or respond as needed
    res.redirect('/dashboard'); // Redirect to the dashboard or another page
    }
);

module.exports = router;
