import dotenv from 'dotenv';

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV || 'development'}`,
})

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    dbUrl: process.env.DB_URL,
};
  