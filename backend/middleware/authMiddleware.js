const jwt = require('jsonwebtoken');

// Проверка авторизации (JWT)
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Извлекаем токен из заголовка Authorization

  if (!token) {
    return res.status(401).json({ message: 'No token provided' }); // Если токена нет, возвращаем ошибку
  }

  // Верифицируем токен
  jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' }); // Если токен недействителен
    }

    req.user = user; // Сохраняем данные пользователя в объекте запроса
    next(); // Переходим к следующему middleware
  });
}

// Проверка ролей пользователя
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: 'Unauthorized' }); // Если пользователь не аутентифицирован
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' }); // Если роль пользователя не входит в список разрешенных ролей
    }

    next(); // Если проверка пройдена, переходим к следующему middleware
  };
}

module.exports = { authenticateToken, authorizeRoles };
