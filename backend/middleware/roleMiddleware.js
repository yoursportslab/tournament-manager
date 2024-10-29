function checkRole(roles) {
    return (req, res, next) => {
      if (!req.user || !req.user.role) {
        // Если информация о пользователе или его роли отсутствует
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const userRole = req.user.role; // Получаем роль текущего пользователя
  
      if (!roles.includes(userRole)) {
        // Если роль пользователя не входит в список разрешенных ролей
        return res.status(403).json({ message: 'Access denied' });
      }
  
      next(); // Если проверка пройдена, переходим к следующему middleware
    };
  }
  
  module.exports = checkRole;
  