import React, { useState } from 'react';
import '../../styles/restaurant/restaurant.css';
import logo from '../../assets/logo.png';
import menuIcon from '../../assets/menu.png';
import DemandesCommandes from '../../components/DemandesCommandes';
import CommandesAFaire from '../../components/CommandesAFaire';
import MobileHeader2 from '../../components/MobileHeader2';
import accept from '../../assets/valid.png';
import deny from "../../assets/croix.png";

const Restaurant = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [demandesCommandes, setDemandesCommandes] = useState([
    { details: "1 Kebab", heure: "10 h 00", id: "6648" }
  ]);
  const [commandesAFaire, setCommandesAFaire] = useState([]);

  const toggleButton = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const handleAccept = (index) => {
    const acceptedCommande = demandesCommandes[index];
    setDemandesCommandes(demandesCommandes.filter((_, i) => i !== index));
    setCommandesAFaire([...commandesAFaire, acceptedCommande]);
  };

  const handleDeny = (index) => {
    setDemandesCommandes(demandesCommandes.filter((_, i) => i !== index));
  };

  return (

    <div className="menu-page">
      <MobileHeader2 />
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
              onClick={() => setIsOpen(true)}
            >
              Ouvert
            </button>
            <button
              name="lang"
              value="en"
              type="button"
              className="Toggle-button"
              onClick={() => setIsOpen(false)}
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
              <th>Heure récupération</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {demandesCommandes.length > 0 ? (
              demandesCommandes.map((commande, index) => (
                <tr key={index}>
                  <td>{commande.details}</td>
                  <td>{commande.heure}</td>
                  <td className="bouttons-commandes">
                    <button className="accepter" onClick={() => handleAccept(index)}>
                      <img src={accept} alt="Accept" className="accepter-img" />
                    </button>
                    <button className="refuser" onClick={() => handleDeny(index)}>
                      <img src={deny} alt="Deny" className="refuser-img" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Vous n'avez aucune demande.</td>
              </tr>
            )}
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
            {commandesAFaire.length > 0 ? (
              commandesAFaire.map((commande, index) => (
                <tr key={index}>
                  <td>{commande.details}</td>
                  <td>{commande.heure}</td>
                  <td>{commande.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Vous n'avez aucune commande à faire.</td>
              </tr>
            )}
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