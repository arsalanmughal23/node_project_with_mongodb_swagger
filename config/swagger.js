const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Title',
            description: 'Description',
            version: '1.0.0',
        },
        servers: [
            {
                url: `${process.env.BASE_URL}/api`,
                description: 'Localhost Api',
            },
            {
                url: `${process.env.STAGE_BASE_URL}/api`,
                description: 'Staging Api'
            }
        ],
        tags: [
          {
            name: "Users",
            description: "Operations related to user management",
          },
          // You can add more tags here for other modules
        ],
    },
    apis: ['./routes/*.js'], // Specify where Swagger should look for documentation
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
