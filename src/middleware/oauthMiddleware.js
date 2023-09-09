const passport = require('passport');

module.exports = (req, res, next) => {
    // Check if the user is authenticated with OAuth using Passport
    passport.authenticate('github', (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'OAuth authentication required' });
        }

        // Check if the OAuth provider matches your expected provider (e.g., 'github')
        if (user.oauthProvider !== 'github') {
            return res.status(401).json({ message: 'Invalid OAuth provider' });
        }

        // Optionally, you can check for additional conditions or token validation here

        next(); // User is authenticated and meets OAuth requirements
    })(req, res, next);
};
