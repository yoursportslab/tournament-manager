import React from 'react';
import '../../assets/styles/navigation/Header.scss';

const Header: React.FC = () => (
    <header className="header">
        <div className="logo">LOGO</div>
        <nav className="main-nav">
            <ul>
                <li>Турниры</li>
                <li>Организаторы</li>
                <li>Партнеры</li>
                <li>Блог</li>
                <li><button className="create-tournament">+ Создать турнир</button></li>
                <li className="account">Аккаунт</li>
            </ul>
        </nav>
    </header>
);

export default Header;
