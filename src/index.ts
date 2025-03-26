import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger-config';
import itemRouter from './routes/itemRoutes';
import authRouter from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import path from 'path';
import { dirname} from 'dirname-filename-esm';

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.json());

if ( process.env.NODE_ENV === 'development' ) {
    const __dirname = dirname(import.meta);
    app.use('/swagger-dark.css', express.static(path.join(__dirname, '../public/swagger-dark.css')));
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, {
        customCssUrl: '/swagger-dark.css' 
    }));
}

app.use('/auth', authRouter);
app.use('/items', itemRouter);

const listeningUrl = `http://localhost:${port}${process.env.NODE_ENV === 'development' ? '/api-docs' : ''}`;
app.listen(port, () => {
    return console.log(`Express is listening at ${listeningUrl}`);
});

