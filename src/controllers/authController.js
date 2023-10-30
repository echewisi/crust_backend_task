// controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/jwtconfig');

// User registration controller
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Generate and send a JWT token for authentication
        const token = jwt.sign({ user: newUser }, config);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// User login controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate and send a JWT token for authentication
        const token = jwt.sign({ user }, config);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.oauthLogin = async (req, res) => {
    try {
        // User data obtained from the OAuth provider (e.g., GitHub)
        const { username, email, /* other relevant user data */ } = req.user;

        // Check if the user already exists in your database
        let user = await User.findOne({ email });

        if (!user) {
            // If the user doesn't exist, create a new user account
            user = new User({
                username,
                email,
                // Set other user properties based on the data received
            });

            await user.save();
        }

        // Generate a JWT token for the user
        const token = jwt.sign({ userId: user._id }, config, { expiresIn: '7d' });

        return res.redirect(`/oauth/login.html?token=${token}&callbackURL=http://localhost:3000/oauth/callback`);    } catch (error) {
        console.error('Error during OAuth login:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};



exports.logout = (req, res) => {
    // Assuming you store the user's JWT token in the 'Authorization' header
    const token = req.header('Authorization');

    if (!token) {
        // If no token is present, the user is not logged in
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Clear the 'Authorization' header to log the user out
    res.removeHeader('Authorization');

    // Respond with a success message
    return res.status(200).json({ message: 'Logout successful' });
};


