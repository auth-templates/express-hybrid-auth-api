import dotenv from 'dotenv';

// Load default .env first
dotenv.config();

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const GlobalConfig = {
	ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	DB_URL: process.env.DATABASE_URL,
	SMTP_HOST: process.env.SMTP_HOST,
	SMTP_PORT: parseInt(process.env.SMTP_PORT),
	REDIS_PORT: parseInt(process.env.REDIS_PORT),
	REDIS_HOST: process.env.REDIS_HOST,
	POSTGRES_USER: process.env.POSTGRES_USER,
	POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
	POSTGRES_DB: process.env.POSTGRES_DB,
	POSTGRES_PORT: process.env.POSTGRES_PORT,
	APP_NAME: process.env.APP_NAME,
	SESSION_SECRET: process.env.SESSION_SECRET,
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
	SESSION_MAX_AGE: parseInt(process.env.SESSION_MAX_AGE),
	ACCESS_TOKEN_MAX_AGE: parseInt(process.env.ACCESS_TOKEN_MAX_AGE),
	TWOFA_RECOVERY_TOKEN_MAX_AGE: parseInt(process.env.TWOFA_RECOVERY_TOKEN_MAX_AGE),
	SIGNUP_TOKEN_MAX_AGE: parseInt(process.env.SIGNUP_TOKEN_MAX_AGE),
	PASSWORD_RESET_TOKEN_MAX_AGE: parseInt(process.env.PASSWORD_RESET_TOKEN_MAX_AGE),
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
	GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
	GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
	SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
	EMAIL_FRONTEND_BASE_URL: process.env.EMAIL_FRONTEND_BASE_URL,
	EMAIL_BACKEND_BASE_URL: process.env.EMAIL_BACKEND_BASE_URL,
	EMAIL_ASSETS_BASE_URL: process.env.EMAIL_ASSETS_BASE_URL,
	FRONTEND_URL: process.env.FRONTEND_URL,
	DEBUG_LOG: Boolean(process.env.DEBUG_LOG),
};

export default GlobalConfig;
