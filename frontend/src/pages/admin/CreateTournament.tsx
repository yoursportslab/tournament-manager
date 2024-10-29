import React, { useState } from 'react';
import axios from 'axios';

const CreateTournament: React.FC = () => {
  const [step, setStep] = useState(1); // Для отслеживания текущего шага
  const [tournamentData, setTournamentData] = useState({
    name: '',
    year: '',
    sport_type: '',
    start_date: '',
    end_date: '',
    country: '',
    city: '',
    level: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTournamentData({
      ...tournamentData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5013/api/tournaments', tournamentData);
      console.log('Tournament created successfully', response.data);
      // Переход на другой шаг или страница, если нужно
    } catch (error) {
      console.error('Error creating tournament', error);
    }
  };

  return (
    <div>
      <h1>Create Tournament - Step {step}</h1>
      {step === 1 && (
        <div>
          <h2>Step 1: Basic Information</h2>
          <input
            type="text"
            name="name"
            placeholder="Tournament Name"
            value={tournamentData.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={tournamentData.year}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="sport_type"
            placeholder="Sport Type"
            value={tournamentData.sport_type}
            onChange={handleInputChange}
          />
          <button onClick={() => setStep(2)}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Step 2: Dates and Location</h2>
          <input
            type="date"
            name="start_date"
            placeholder="Start Date"
            value={tournamentData.start_date}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="end_date"
            placeholder="End Date"
            value={tournamentData.end_date}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={tournamentData.country}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={tournamentData.city}
            onChange={handleInputChange}
          />
          <button onClick={() => setStep(3)}>Next</button>
          <button onClick={() => setStep(1)}>Back</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2>Step 3: Level</h2>
          <input
            type="text"
            name="level"
            placeholder="Tournament Level (Elite, A, B, C)"
            value={tournamentData.level}
            onChange={handleInputChange}
          />
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={() => setStep(2)}>Back</button>
        </div>
      )}
    </div>
  );
};

export default CreateTournament;
