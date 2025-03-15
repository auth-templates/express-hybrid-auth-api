import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger';
import itemRouter from './routes/itemRoutes';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.json());

// Serve Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/items', itemRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

