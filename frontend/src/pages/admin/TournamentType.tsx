import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '/src/assets/styles/admin/TournamentType.scss';


const TournamentType: React.FC = () => {
  const location = useLocation();
  
  // Добавьте этот лог, чтобы отладить состояние
  console.log('Location state:', location.state); 

  const { sport } = location.state || { sport: 'unknown' }; // Дефолтное значение, если state пустой
  console.log(`Received sport: ${sport}`);
  const navigate = useNavigate();

  const handleTournamentTypeSelect = (type: string) => {
    navigate('/next-step', { state: { sport, tournamentType: type } });
  };

  return (
    <div>
      <h1>Выберите тип турнира для {sport === 'football' ? 'Футбол' : 'Футзал'}</h1>
      <div className="tournament-type-selection">
        <div onClick={() => handleTournamentTypeSelect('league')}>Лига</div>
        <div onClick={() => handleTournamentTypeSelect('group-playoff')}>Групповой этап + Плей-офф</div>
        <div onClick={() => handleTournamentTypeSelect('playoff')}>Плей-офф</div>
      </div>
    </div>
  );
};

export default TournamentType;

