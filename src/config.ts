import dotenv from 'dotenv';

dotenv.config({path: `.env.${process.env.NODE_ENV || 'development'}`});

const GlobalConfig = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    dbUrl: process.env.DB_URL,
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
    ACCESS_TOKEN_MAX_AGE: parseInt(process.env.ACCESS_TOKEN_MAX_AGE)
}

export default GlobalConfig;