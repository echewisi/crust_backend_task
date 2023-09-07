const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Import your Sequelize configuration

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

module.exports = Task;
