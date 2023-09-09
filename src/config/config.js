const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    {
        host: 'localhost',
        user: 'postgres',
        port: 5432,
        password: "1234",
        database: 'postgres',
        dialect: 'postgres',
    }
)

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Database connection has been established successfully.');
//     })
//     .catch((err) => {
//         console.error('Unable to connect to the database:', err);
//     });


module.exports = sequelize;


