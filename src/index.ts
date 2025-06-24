import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger-config';
import authRouter from './routes/authRoutes';
import twofaRoutes from './routes/2faRoutes';
import cookieParser from 'cookie-parser';
import path from 'path';
import { i18nMiddleware } from './middlewares/i18n';
import appRoot from 'app-root-path'
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { redisClient } from './lib/redis/client';
import GlobalConfig from './config';
import { Request, Response } from 'express';
import passport from 'passport';
import './strategies';
import csrfRoutes from './routes/csrfRoutes';
import googleAuthRoutes from './routes/googleAuthRoutes';
import githubAuthRoutes from './routes/githubAuthRoutes';
import { errorHandler } from './middlewares/error-handler';
import { csrfProtection, csrfTokenHandler } from './middlewares/csrf';
import { requireTermsAcceptance } from './middlewares/require-terms-acceptance';

const app = express();
const port = 3000;

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: GlobalConfig.SESSION_SECRET,
    resave: false,
    rolling: true, // This enables automatic touch
    saveUninitialized: false,
    cookie: {
        secure: false, // secure: true requires HTTPS, which is usually off in dev
        httpOnly: true,
        maxAge: GlobalConfig.SESSION_MAX_AGE
    }
}));

app.use(passport.initialize());
app.use(passport.session()); // <-- This integrates Passport with Redis-backed sessions

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use(i18nMiddleware);
app.use(cookieParser());
app.use(express.json());

app.get('/', csrfRoutes);

app.use(csrfProtection);

console.log("env:", process.env.NODE_ENV)

if ( process.env.NODE_ENV === 'development' ) {
    console.log("swagger-dark", path.join(appRoot.path, 'public/swagger-dark.css'));
    app.use('/swagger-dark.css', express.static(path.join(appRoot.path, 'public/swagger-dark.css')));
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, {
        customCssUrl: '/swagger-dark.css' 
    }));
}

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a> --- <a href="/auth/github">Login with Github</a>');
});

app.get('/profile', (request: Request, response: Response) => {
  if ( !request.isAuthenticated() ) {
    return response.redirect('/');
  }
  response.send(`<h1>Hello ${JSON.stringify(request.user)}</h1><a href="/auth/logout">Logout</a>`);
});

app.use('/2fa', twofaRoutes);
app.use('/auth', googleAuthRoutes);
app.use('/auth', githubAuthRoutes);
app.use('/auth', authRouter);
app.use(requireTermsAcceptance)

app.use(errorHandler);


const listeningUrl = `http://localhost:${port}${process.env.NODE_ENV === 'development' ? '/api-docs' : ''}`;
app.listen(port, () => {
    return console.log(`Express is listening at ${listeningUrl}`);
});

