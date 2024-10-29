import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SportSelection: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSportSelect = (sport: string) => {
    setSelectedSport(sport);
  };

  const handleNext = () => {
    if (selectedSport) {
      console.log(`Selected sport: ${selectedSport}`);
      navigate('/tournament-type', { state: { sport: selectedSport } });
    } else {
      alert('Please select a sport to proceed');
    }
  };
  

  return (
    <div>
      <h1>Select Sport</h1>
      <div className="sport-selection">
        <div 
          className={`sport-option ${selectedSport === 'football' ? 'selected' : ''}`}
          onClick={() => handleSportSelect('football')}
        >
          Football
        </div>
        <div 
          className={`sport-option ${selectedSport === 'futsal' ? 'selected' : ''}`}
          onClick={() => handleSportSelect('futsal')}
        >
          Futsal
        </div>
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default SportSelection;
