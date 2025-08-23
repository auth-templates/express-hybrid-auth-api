import { writeFileSync, mkdirSync, existsSync } from 'fs';
import swaggerSpec from './swagger-config.js';
import * as yaml from 'js-yaml';

// Ensure the directory exists
const outputDir = './.swagger';
if (!existsSync(outputDir)) {
	mkdirSync(outputDir, { recursive: true }); // recursive ensures parent directories are created
}

// Convert the Swagger JSON to YAML
const swaggerYaml = yaml.dump(swaggerSpec);

// Write YAML to file
const outputFile = `${outputDir}/express-hybrid-auth-api.yml`;
writeFileSync(outputFile, swaggerYaml);
console.log('✅ Swagger JSON generated at .swagger/express-hybrid-auth-api.yml');
