import swaggerJSDoc from 'swagger-jsdoc';
import { readFileSync } from 'fs';
import YAML from 'yaml';

// Load extra YAML definitions
// Load YAML-based extra Swagger definitions
const file = readFileSync('./src/swagger-extra.yaml', 'utf8');
const extraSwaggerYaml = YAML.parse(file);

const swaggerDefinition = {
    openapi: '3.0.3',
    servers: [
        {
            url: 'http://localhost:3000',
        }, 
    ],
    ...extraSwaggerYaml, // Merge YAML definitions
}

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts','./src/controllers/*.ts', './src/middlewares/*.ts', './src/@types/*.ts'], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;