const { Pool } = require('pg');

const pool = new Pool({
  user: 'yoursportlab', // замените на ваше имя пользователя
  host: 'localhost',
  database: 'yoursportlab_1', // замените на название вашей базы данных
  password: '!Y00rSportL4b!2025', // замените на ваш пароль
  port: 5432,
});

module.exports = pool;