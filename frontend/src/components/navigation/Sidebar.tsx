import React from 'react';
import '../../assets/styles/navigation/Sidebar.scss';

const Sidebar: React.FC = () => (
    <aside className="sidebar">
        <div className="tournament-logo">KINGS CUP</div>
        <nav className="sidebar-nav">
            <ul>
                <li>Приглашение</li>
                <li>Регламент</li>
                <li>Расписание</li>
                <li>Участники</li>
                <li>Статистика</li>
                <li>Организатор</li>
                <li>Настройки турнира</li>
                <li>Поддержка</li>
            </ul>
        </nav>
        <div className="tournament-ads">TOURNAMENT ADS</div>
    </aside>
);

export default Sidebar;
