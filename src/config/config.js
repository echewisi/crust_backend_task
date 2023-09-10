const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    {
        host: 'localhost',
        user: 'postgres',
        port: 5432,
        password: "rojerjoe",
        database: 'crust',
        dialect: 'postgres',
    }
)

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });


module.exports = sequelize;


