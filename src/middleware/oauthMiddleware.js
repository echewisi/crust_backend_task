const passport = require('passport');
const generateJwtToken= require('./generatejwttoken')

module.exports = (req, res, next) => {
    passport.authenticate('github', (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'OAuth authentication error' });
        }

        if (!user) {
            return res.status(401).json({ message: 'OAuth authentication required' });
        }

        // Check if the OAuth provider matches your expected provider (e.g., 'github')
        if (user.oauthProvider !== 'github') {
            return res.status(401).json({ message: 'Invalid OAuth provider' });
        }

        // Optionally, you can check for additional conditions or token validation here

        // If you want to generate a JWT token for the user, do it here
        const jwtToken = generateJwtToken(user); // Implement this function

        // Attach the JWT token to the response or store it as needed
        req.jwtToken = jwtToken;

        next(); // User is authenticated and meets OAuth requirements
    })(req, res, next);
};
