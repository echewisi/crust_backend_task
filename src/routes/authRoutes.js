// routes/authRoutes.js
const express = require('express');
const passport = require('../config/oauth.config'); // Import the GitHub OAuth configuration
const User= require('../models/user')
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const authController = require('../controllers/authController');
const oauthMiddleware = require('../middleware/oauthMiddleware');
const router = express.Router();
require("dotenv").config()




/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and registration
 */


// User registration route
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Server error
 */

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
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login and obtain a JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       200:
 *         description: User logged in successfully (returns JWT token)
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized (invalid credentials)
 *       500:
 *         description: Server error
 */
    router.post('/login', authController.login);

// GitHub authorization link route
/**
 * @swagger
 * /auth/github/authorize:
 *   get:
 *     summary: Redirect to OAuth Authorization
 *     tags: [Authentication]
 *     description: |
 *       Click the following link to authorize your application with GitHub:
 *       [Authorize with GitHub](https://github.com/login/oauth/authorize?client_id=e7200d366c6ab46ef757&scope=user:email&redirect_uri=http://localhost:3000/auth/github/callback)
 *     responses:
 *       302:
 *         description: Redirects to GitHub OAuth Authorization
 */
router.get('/github/authorize', (req, res) => {
    // Generate the GitHub OAuth authorization URL
    const githubAuthUrl = 'https://github.com/login/oauth/authorize' +
        `?client_id=${process.env.GITHUB_CLIENT_ID}`;

    // Store the GitHub authorization URL in the session or temporary storage
    req.session.githubAuthUrl = githubAuthUrl;

    // Redirect to the github consent screen 
    res.redirect(githubAuthUrl);
});
// GitHub authentication route
/**
 * @swagger
 * /auth/github:
 *   get:
 *     summary: Authenticate with GitHub OAuth
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to GitHub OAuth login page
 *       500:
 *         description: Server error
 */
router.get('/github', oauthMiddleware, passport.authenticate('github', { scope: ['user:email'], 
callbackURL: 'http://localhost:3000/auth/github/callback?code=:code' }));

// GitHub callback route
/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     summary: Callback URL for GitHub OAuth authentication
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to the application after GitHub OAuth login
 *       500:
 *         description: Server error
 */
router.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/login'
    }),
    (req, res) => {
        res.redirect(__dirname + '/dashboard');
    }
);

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Logout the authenticated user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized (missing or invalid JWT token)
 *       500:
 *         description: Server error
 *     security:
 *       - BearerAuth: [] # Use Bearer authentication (JWT token)
 */
router.get('/logout', authMiddleware, authController.logout);

module.exports = router;
