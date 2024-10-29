const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Здесь у нас будет простой логин без базы данных. В будущем ты можешь интегрировать это с системой пользователей.
const users = [
  { id: 1, username: 'admin', password: 'admin123' } // Пример простого пользователя
];

// Маршрут для входа в систему (аутентификация)
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Проверяем, есть ли такой пользователь в системе
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Если пользователь найден, создаем JWT токен
  const token = jwt.sign({ id: user.id, username: user.username }, 'secretKey', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
