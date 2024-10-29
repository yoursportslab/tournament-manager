import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Tournament {
  id: number;
  name: string;
  start_date: string; // Используем start_date, если это корректно для API
}

const Tournaments: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('http://localhost:5013/api/tournaments')
      .then((response) => {
        console.log(response.data); // Логируем данные для отладки
        setTournaments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error); // Логируем ошибку для отладки
        setError('Failed to fetch tournaments');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading tournaments...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Tournaments</h1>
      <ul>
        {tournaments.map((tournament) => (
          <li key={tournament.id}>
            {tournament.name} - {new Date(tournament.start_date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tournaments;
