// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import TournamentPage from './pages/public/TournamentPage';
import './assets/styles/main.scss';


const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tournament" element={<TournamentPage />} />
        </Routes>
    );
};

export default App;
