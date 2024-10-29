const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../db'); // Подключение к базе данных

// Маршрут для регистрации нового пользователя
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  // Проверка на наличие всех полей
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Проверка на существование пользователя с таким же email
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Добавляем пользователя в базу данных с назначенной ролью
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password, role, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *',
      [username, email, hashedPassword, role]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error('Error registering user:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Маршрут для входа
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Проверка на наличие всех полей
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Поиск пользователя в базе данных по имени
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Сравнение хэшированного пароля
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Генерация JWT токена
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your_secret_key', // Использование секретного ключа из переменных окружения
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Error logging in user:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
