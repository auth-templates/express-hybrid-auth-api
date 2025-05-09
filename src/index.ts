import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger-config';
import itemRouter from './routes/itemRoutes';
import authRouter from './routes/authRoutes';
import twofaRoutes from './routes/2faRoutes';
import cookieParser from 'cookie-parser';
import path from 'path';
import { i18nMiddleware } from './middlewares/i18n';
import appRoot from 'app-root-path'

const app = express();
const port = 3000;

app.use(i18nMiddleware);

app.use(cookieParser());
app.use(express.json());

console.log("env:", process.env.NODE_ENV)

if ( process.env.NODE_ENV === 'development' ) {
    console.log("swagger-dark", path.join(appRoot.path, 'public/swagger-dark.css'));
    app.use('/swagger-dark.css', express.static(path.join(appRoot.path, 'public/swagger-dark.css')));
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, {
        customCssUrl: '/swagger-dark.css' 
    }));
}

app.use('/2fa', twofaRoutes);
app.use('/auth', authRouter);
app.use('/items', itemRouter);

const listeningUrl = `http://localhost:${port}${process.env.NODE_ENV === 'development' ? '/api-docs' : ''}`;
app.listen(port, () => {
    return console.log(`Express is listening at ${listeningUrl}`);
});

