const express = require('express');
const router = express.Router();
const pool = require('../db');
const { getTournaments, createTournament } = require('../models/tournamentModel');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware'); 
const bcrypt = require('bcrypt');

// Маршрут для получения всех турниров (открытый для всех пользователей)
router.get('/', async (req, res) => {
  try {
    const tournaments = await getTournaments();
    res.json(tournaments);
  } catch (error) {
    console.error(error);  
    res.status(500).json({ message: 'Error retrieving tournaments' });
  }
});

// Маршрут для создания нового турнира (только для организаторов или администраторов)
router.post('/', authenticateToken, authorizeRoles('admin', 'organizer'), async (req, res) => {
  const { name, year, sport_type, start_date, end_date, country, city, level } = req.body;
  
  if (!name || !year || !sport_type || !start_date || !end_date || !country || !city || !level) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  try {
    const newTournament = await createTournament({ name, year, sport_type, start_date, end_date, country, city, level });
    res.status(201).json(newTournament);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating tournament' });
  }
});

// Маршрут для получения турнира по ID (только для авторизованных пользователей)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tournaments WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).send('Tournament not found');
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Обновление турнира по ID (только для организаторов, администраторов или модераторов)
router.put('/:id', authenticateToken, authorizeRoles('admin', 'organizer', 'moderator'), async (req, res) => {
  const { id } = req.params;
  const { name, year, sport_type, start_date, end_date, country, city, level } = req.body;

  if (!name || !year || !sport_type || !start_date || !end_date || !country || !city || !level) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedTournament = await pool.query(
      'UPDATE tournaments SET name = $1, year = $2, sport_type = $3, start_date = $4, end_date = $5, country = $6, city = $7, level = $8 WHERE id = $9 RETURNING *',
      [name, year, sport_type, start_date, end_date, country, city, level, id]
    );

    if (updatedTournament.rows.length === 0) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    res.json(updatedTournament.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Маршрут для удаления турнира по ID (только для организаторов или администраторов)
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'organizer'), async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM tournaments WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    res.json({ message: 'Tournament deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Маршрут для регистрации нового пользователя
router.post('/register', async (req, res) => {
  const { username, password, email, role } = req.body;

  // Проверка на существование пользователя с таким же именем
  const existingUser = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
  if (existingUser.rows.length > 0) {
    return res.status(400).json({ message: 'User with this username or email already exists' });
  }

  // Хэширование пароля
  const hashedPassword = await bcrypt.hash(password, 10);

  // Добавление пользователя в базу данных
  try {
    const newUser = await pool.query(
      'INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, hashedPassword, email, role]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error registering user' });
  }
});

module.exports = router;
