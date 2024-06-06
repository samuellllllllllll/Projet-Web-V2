import React, { useState } from 'react';
import '../styles/restaurant.css';
import logo from '../assets/logo.png';
import menuIcon from '../assets/menu.png';
import DemandesCommandes from '../components/DemandesCommandes';
import CommandesAFaire from '../components/CommandesAFaire';

const Restaurant = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleButton = () => {
    setIsOpen(!isOpen);
  };

  const handleAccept = () => {
    console.log("Accepted");
  };

  const handleDeny = () => {
    console.log("Denied");
  };

  return (
    <div className="menu-page">
      <header className="menu-header">
        <img src={logo} alt="logo CESI'Eats" className="logo" />
        <img src={menuIcon} alt="Menu Icon" className="menuIcon" />
      </header>
      <main className="menu-content">
        <div className="Menu-bottom-button-box">
          Mon restaurant est ...
          <div className={`Menu-bottom-button ${isOpen ? 'open' : 'closed'}`}>
            <div className="Button"></div>
            <button
              name="lang"
              value="fr"
              type="button"
              className="Toggle-button"
              onClick={toggleButton}
            >
              Ouvert
            </button>
            <button
              name="lang"
              value="en"
              type="button"
              className="Toggle-button"
              onClick={toggleButton}
            >
              Fermé
            </button>
          </div>
        </div>
        <h1>Demandes commandes</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Détail</th>
              <th className='heure'>Heure récupération</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <DemandesCommandes
                details="1 Kebab"
                heure="10 h 00"
                onAccept={handleAccept}
                onDeny={handleDeny}
              />
              {/* <td colSpan="2" className="table-empty">Vous n'avez aucune demande.</td> */}
            </tr>
          </tbody>
        </table>
        <h1>Commandes à faire</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Détail</th>
              <th>Heure récupération</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <CommandesAFaire
                details="1 Kebab"
                heure="10 h 00"
                id="2002"
              />
              {/* <td colSpan="3" className="table-empty">Vous n'avez aucune commande à faire.</td> */}
            </tr>
          </tbody>
        </table>
      </main>
      <footer className="menu-footer">
        <p>&copy; 2024 CESI'Eats. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Restaurant;
