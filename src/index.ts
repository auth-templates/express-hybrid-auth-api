import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger';
import itemRouter from './routes/itemRoutes';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.json());

console.log("pathanme:", path.join(__dirname, '../public/swagger-dark.css'))
// Serve the dark CSS file
app.use('/swagger-dark.css', express.static(path.join(__dirname, '../public/swagger-dark.css')));

// Serve Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, {
    customCssUrl: '/swagger-dark.css' 
}));
app.use('/items', itemRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}/api-docs`);
});

