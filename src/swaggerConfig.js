const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend service providing CRUD functionality and Oauth authentication',
            version: '1.0.0',
            description: 'Documentation for your RESTful API',
        },
        servers: [
            {
                url: 'http://localhost:3000/',
                description: 'Local Development Server',
            },
        ],
        "components": {
            "securitySchemes": {
                "BearerAuth": {
                    "type": "apiKey",
                    "name": "Authorization",
                    "in": "header"
                }
            }
        },
    },
    apis: ['./src/routes/authRoutes.js', './src/routes/taskRoutes.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
