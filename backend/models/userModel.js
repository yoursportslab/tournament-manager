const pool = require('../db');
const bcrypt = require('bcrypt');

// Функция для создания нового пользователя
async function createUser(username, email, password, role) {
  try {
    // Хэшируем пароль перед сохранением
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, email, password, role, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *',
      [username, email, hashedPassword, role]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Проброс ошибки для обработки в маршруте
  }
}

// Функция для поиска пользователя по email
async function findUserByEmail(email) {
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0]; // Возвращаем первого найденного пользователя или null, если нет
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
}

// Функция для поиска пользователя по имени
async function findUserByUsername(username) {
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0]; // Возвращаем первого найденного пользователя или null, если нет
  } catch (error) {
    console.error('Error finding user by username:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername,
};
