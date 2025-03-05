import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Flexible Leaves API',
        version: '1.0.0',
        description: 'API Description for leave management app',
    },
    servers: [
        {
            url: 'http://localhost:3000',
        }, 
    ],
}

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts','./src/controllers/*.ts'], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;