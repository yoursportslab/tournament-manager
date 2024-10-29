// frontend/src/components/navigation/Footer.tsx
import React from 'react';
import '../../assets/styles/navigation/Footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Tournament Manager. All rights reserved.</p>
                <nav className="footer-nav">
                    <a href="/terms">Terms of Service</a>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/contact">Contact Us</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
