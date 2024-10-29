const express = require('express');
const cors = require('cors');
const tournamentRoutes = require('./routes/tournaments'); // Маршруты турниров
const authRoutes = require('./routes/authRoutes'); // Маршруты авторизации

const app = express();

// Middleware
app.use(cors()); // Разрешаем CORS
app.use(express.json()); // Для обработки JSON запросов

// Задаем порт
const PORT = process.env.PORT || 5013;

// Подключаем маршруты
app.use('/api/tournaments', tournamentRoutes); // Маршруты турниров
app.use('/api/auth', authRoutes); // Маршруты авторизации

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
