import { writeFileSync } from 'fs';
import swaggerSpec from './swagger-config';
import * as yaml from 'js-yaml';

// Convert the Swagger JSON to YAML
const swaggerYaml = yaml.dump(swaggerSpec);

writeFileSync('./.swagger/flexible-leaves-api.yml', swaggerYaml);
console.log('✅ Swagger JSON generated at .swagger/flexible-leaves-api.yml');
