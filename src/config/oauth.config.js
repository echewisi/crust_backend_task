//this uses github oauth
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const dotenv = require('dotenv').config()
const User= require('../models/user')


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
    async (accessToken, refreshToken, profile, done) => {
        try{
            //check if a user with a github ID exists in your database
            let user= await User.findOne({where:{oauthProvider: 'github', oauthProviderId: profile.id }})
        
      // You can customize how user data is handled here
      if (!user) {
        // If the user doesn't exist, create a new user with GitHub details
        user = await User.create({
          username: profile.username,
          email: profile.emails ? profile.emails[0].value : null,
          oauthProvider: 'github',
          oauthProviderId: profile.id,
        })
      // You can save or retrieve user data in your database here
      return done(null, user);
        }} catch(error){
            return done(error)
        }
    }
    ) 
);

module.exports = passport;
