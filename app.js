// app.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/userRoutes');
const YAML = require('yamljs');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(express.json());


// swaggerOptions by js
const swaggerDocs = require('./config/swagger');

// swaggerOptions by yml
// Load Swagger YML file
// const swaggerDocs = YAML.load('./config/swagger.yml');


// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/users', userRoutes);

switch (process.env.NODE_ENV) {
    case "production": 
        process.env.BASE_URL = process.env.PROD_BASE_URL;
        break;
    case "staging": 
        process.env.BASE_URL = process.env.STAGE_BASE_URL;
        break;
    default : 
        process.env.BASE_URL = process.env.BASE_URL || 'http://localhost';
        break;
}

const BASE_URL = process.env.BASE_URL;

console.log(`BASE_URL: ${BASE_URL}`);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on ${BASE_URL}:${PORT}`);
    console.log(`Swagger UI is available at ${BASE_URL}:${PORT}/api-docs`);
});
