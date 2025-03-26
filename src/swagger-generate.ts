import { writeFileSync } from 'fs';
import swaggerSpec from './swagger-config';
import * as yaml from 'js-yaml';

// Convert the Swagger JSON to YAML
const swaggerYaml = yaml.dump(swaggerSpec);

writeFileSync('./dist/swagger.yml', swaggerYaml);
console.log('✅ Swagger JSON generated at dist/swagger.yml');
