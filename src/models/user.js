const {DataTypes}= require('sequelize');
const sequelize= require('../config/config');

const User= sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    password:{
        type: DataTypes.STRING,
        allowNull: false,

    },

      // OAuth provider details
    oauthProvider: {
        type: DataTypes.STRING, // Store the OAuth provider's name (e.g., 'google', 'facebook')
        allowNull: true,
},
    oauthProviderId: {
        type: DataTypes.STRING, // Store the user's ID from the OAuth provider
        allowNull: true,
},
    oauthAccessToken: {
        type: DataTypes.STRING, // Store the OAuth access token
        allowNull: true,
}

})

module.exports= User;