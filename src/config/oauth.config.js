//this uses github oauth
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const dotenv = require('dotenv').config()

// Replace these values with your GitHub OAuth App's credentials
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

passport.use(
    new GitHubStrategy(
        {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/github/callback', 
    },
    // Passport.js callback function for handling user data
    (accessToken, refreshToken, profile, done) => {
      // You can customize how user data is handled here
        const user = {
            id: profile.id,
            username: profile.username,
            email: profile.emails ? profile.emails[0].value : null,
    };

      // You can save or retrieve user data in your database here

    return done(null, user);
    }
    ) 
);

module.exports = passport;
