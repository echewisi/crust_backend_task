const jwt = require('jsonwebtoken');
const config = require('../config/jwtconfig'); // Import your JWT configuration

function generateJwtToken(user) {
    // Create a payload with user data (customize as needed)
    const payload = {
        userId: user.id,
        username: user.username,
        // Add other user data as needed
    };

    // Generate the JWT token
    const token = jwt.sign(payload, config, { expiresIn: '7d' }); // Adjust expiration as needed

    return token;
}

module.exports = {
    generateJwtToken,
};
