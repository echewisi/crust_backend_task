const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Import your Sequelize configuration
const User = require('./user');

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User, // The name of your Users table
            key: 'id', // The primary key of the Users table
        },
        allowNull: false,
    },

});
Task.sync()

module.exports = Task;
