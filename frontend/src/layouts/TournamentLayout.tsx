import React from 'react';
import Header from '../components/navigation/Header';
import Sidebar from '../components/navigation/Sidebar';
import Footer from '../components/navigation/Footer';
import TournamentHeader from '../components/tournament/TournamentHeader';
import TournamentDetails from '../components/tournament/TournamentDetails';
import TournamentSchedule from '../components/tournament/TournamentSchedule';
import TournamentStandings from '../components/tournament/TournamentStandings';
import '../assets/styles/layouts/TournamentLayout.scss';

const TournamentLayout: React.FC = () => (
    <div className="tournament-layout">
        <Header />
        <Sidebar />
        <main>
            <TournamentHeader />
            <TournamentDetails />
            <TournamentSchedule />
            <TournamentStandings />
        </main>
        <Footer />
    </div>
);

export default TournamentLayout;
