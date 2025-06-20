// Memuat variabel environment dari .env di awal
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE, 
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql'
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_DATABASE}_test`, 
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql'
  },
  production: {
    username: process.env.DB_USERNAME_PROD || process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD_PROD || process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_PROD || `${process.env.DB_DATABASE}_production`,
    host: process.env.DB_HOST_PROD || process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql'
  }
};