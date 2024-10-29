const { Pool } = require('pg');
const pool = new Pool({
  user: 'yoursportlab',
  host: 'localhost',
  database: 'yoursportlab_1',
  password: '!Y00rSportL4b!2025',
  port: 5432,
});

// Функция для получения всех турниров
const getTournaments = async () => {
  try {
    const res = await pool.query('SELECT * FROM tournaments ORDER BY start_date ASC'); // Сортировка по дате начала турниров
    return res.rows;
  } catch (error) {
    console.error('Error fetching tournaments', error);
    throw error; // Проброс ошибки дальше для обработки в маршруте
  }
};

// Функция для создания нового турнира с учетом всех необходимых полей
const createTournament = async ({ name, year, sport_type, start_date, end_date, country, city, level }) => {
  try {
    const res = await pool.query(
      'INSERT INTO tournaments (name, year, sport_type, start_date, end_date, country, city, level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, year, sport_type, start_date, end_date, country, city, level]
    );
    return res.rows[0]; // Возвращаем созданную запись
  } catch (error) {
    console.error('Error creating tournament', error);
    throw error; // Проброс ошибки дальше для обработки в маршруте
  }
};

module.exports = {
  getTournaments,
  createTournament,
};
