import React from 'react';
import '../styles/restaurant.css';
import logo from '../assets/logo.png';
import menuIcon from '../assets/menu.png';

const Restaurant = () => {
  return (
    <div className="menu-page">
      <header className="menu-header">
        <img src={logo} alt="logo CESI'Eats" className="logo" />
        <img src={menuIcon} alt="Menu Icon" className="menuIcon" />
      </header>
      <main className="menu-content">
        <div className="Menu-bottom-button-box">
          Mon restaurant est ...
          <div className="Menu-bottom-button">
            <div className="Button"></div>
            <button name="lang" value="fr" type="button" className="Toggle-button">
              Ouvert
            </button>
            <button name="lang" value="en" type="button" className="Toggle-button">
              Fermé
            </button>
          </div>
        </div>
        <h1>
          demandes commandées
        </h1>
      </main>
      <footer className="menu-footer">
        <p>&copy; 2024 CESI'Eats. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Restaurant;
