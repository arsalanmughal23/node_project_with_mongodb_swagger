const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Initialize Express app
const app = express();
const BASE_URL = process.env.BASE_URL || 'http://localhost';
const PORT = 3000;


// Middleware to parse JSON bodies
app.use(express.json());

// Set up Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js MongoDB API',
      version: '1.0.0',
      description: 'A simple Express API with MongoDB and Swagger documentation',
    },
    servers: [
      {
        url: '/api', // This sets the base URL prefix
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API routes
};

// Generate Swagger specs
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Use Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Use user routes
app.use('/api', userRoutes);

// Connect to MongoDB and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on ${BASE_URL}:${PORT}`);
    console.log(`Swagger UI is available at ${BASE_URL}:${PORT}/api-docs`);
  });
});
