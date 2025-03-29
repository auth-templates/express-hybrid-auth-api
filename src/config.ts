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
    POSTGRES_PORT: process.env.POSTGRES_PORT
}

export default GlobalConfig;