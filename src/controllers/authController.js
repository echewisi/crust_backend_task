// controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
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
        const token = jwt.sign({ user: newUser }, config.jwtSecret);
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
        const token = jwt.sign({ user }, config.jwtSecret);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.oauthLogin = async (req, res) => {
    try {
        // Extract user data from the OAuth provider's response
        const { username, email, /* other relevant user data */ } = req.body;

        // Check if the user already exists in your database
        let user = await UserModel.findOne({ email });

        if (!user) {
            // If the user doesn't exist, create a new user account
            user = new UserModel({
                username,
                email,
                // Set other user properties based on the data received
            });

            await user.save();
        }

        // Generate a JWT token for the user
        const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '7d' });

        // Respond with the JWT token
        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error during OAuth login:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


exports.logout = (req, res) => {
    // Assuming you store the user's JWT token in a cookie or header
    const token = req.cookies.jwt; // Change this according to how you store the token

    if (!token) {
        // If no token is present, the user is not logged in
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify and decode the JWT token
        jwt.verify(token, config.jwtSecret);

        // Clear the JWT token (e.g., by removing the cookie or header)
        res.clearCookie('jwt'); // Change this according to how you store the token

        // Respond with a success message
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        // If there's an error while verifying the token, consider it a server error
        console.error('Error during logout:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Implement similar controller functions for "Tasks" CRUD operations
