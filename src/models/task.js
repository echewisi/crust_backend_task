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

});
Task.sync()
Task.belongsTo(User, {
    foreignKey: 'userId', 
});
module.exports = Task;
