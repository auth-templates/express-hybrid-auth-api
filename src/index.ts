import GlobalConfig from './config.js';
import express from 'express';
import authRouter from './routes/authRoutes.js';
import twofaRoutes from './routes/2faRoutes.js';
import cookieParser from 'cookie-parser';
import { i18nMiddleware } from './middlewares/i18n.js';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { redisClient } from './lib/redis/client.js';
import passport from 'passport';
import csrfRoutes from './routes/csrfRoutes.js';
import { errorHandler } from './middlewares/error-handler.js';
import { csrfProtection } from './middlewares/csrf.js';
import { requireTermsAcceptance } from './middlewares/require-terms-acceptance.js';
import { require2FA } from './middlewares/require-2fa.js';
import { authenticate } from './middlewares/authenticate.js';
import cors from 'cors';
import { setupSocialAuth } from './routes/social-auth/index.js';
import { registerDevRoutes } from './routes/dev/dev-routes.js';
import { configurePassport } from './routes/social-auth/passport-config.js';
import { createHttpLogger } from './lib/logger/http-logger.js';

console.log('env:', GlobalConfig.ENV);

const app = express();
const port = GlobalConfig.PORT;

if (GlobalConfig.DEBUG_LOG === true) {
	// Use custom HTTP logger middleware
	app.use(createHttpLogger());
}

app.use(
	cors({
		origin: GlobalConfig.FRONTEND_URL, // your frontend URL & port here
		credentials: true, // allows cookies and auth headers
	})
);

app.use(
	session({
		store: new RedisStore({ client: redisClient }),
		secret: GlobalConfig.SESSION_SECRET,
		resave: false,
		rolling: true, // This enables automatic touch
		saveUninitialized: false,
		cookie: {
			secure: GlobalConfig.ENV === 'production', // secure: true requires HTTPS, which is usually off in dev
			httpOnly: true,
			maxAge: GlobalConfig.SESSION_MAX_AGE,
		},
	})
);

app.use(passport.initialize());
app.use(passport.session()); // <-- This integrates Passport with Redis-backed sessions

configurePassport();

app.use(i18nMiddleware);
app.use(cookieParser());
app.use(express.json());

app.use('/csrf', csrfRoutes);

app.use(csrfProtection);

if (GlobalConfig.ENV === 'development') {
	registerDevRoutes(app);
}

app.use(require2FA);
app.use(requireTermsAcceptance);
app.use('/2fa', twofaRoutes);

await setupSocialAuth(app);

app.use('/auth', authRouter);
app.use(authenticate);

app.use(errorHandler);

const listeningUrl = `http://localhost:${port}${GlobalConfig.ENV === 'development' ? '/api-docs' : ''}`;
app.listen(port, () => {
	return console.log(`Express is listening at ${listeningUrl}`);
});
