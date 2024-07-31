import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Documentation for my Express API',
  },
  servers: [
    {
      url: 'http://localhost:3001/api/v1',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routers/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec
