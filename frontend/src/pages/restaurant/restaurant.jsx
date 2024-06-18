import React, { useState, useEffect } from 'react';
import '../../styles/restaurant/restaurant.css';
import logo from '../../assets/logo.png';
import menuIcon from '../../assets/menu.png';
import DemandesCommandes from '../../components/DemandesCommandes';
import CommandesAFaire from '../../components/CommandesAFaire';
import MobileHeader2 from '../../components/MobileHeader2';
import accept from '../../assets/valid.png';
import deny from "../../assets/croix.png";
import axios from 'axios';

const Restaurant = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [testOrders, setOrders] = useState([]);


  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4545/orders/status/0'
      );
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  useEffect(() => {


    fetchOrders();

    const intervalId = setInterval(fetchOrders, 15000); // Fetch orders every 15 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);


  const [commandesAFaire, setCommandesAFaire] = useState([]);

  const toggleButton = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const handleAccept = (index) => {
    const acceptedCommande = testOrders[index];
    setOrders(testOrders.filter((_, i) => i !== index));
    setCommandesAFaire([...commandesAFaire, acceptedCommande]);
    const putOrders = async () => {
      //TO DO
    }
  };

  const handleDeny = (index) => {
    setOrders(testOrders.filter((_, i) => i !== index));
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
            {testOrders.length > 0 ? (
              testOrders.map((commande, index) => (
                <tr key={index}>
                  <td>{commande.menus.map(menu=> `${menu.quantity} ${menu.name_starter} ${menu.name_main_dish} ${menu.name_drink} ${menu.name_dessert}`).join(', ')}</td>
                  <td>{commande.articles.map(article => `${article.quantity} ${article.name_article}`).join(', ')}</td>
                  <td></td>
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
                  <td>{commande.menus.map(menu=> `${menu.quantity} ${menu.name_starter} ${menu.name_main_dish} ${menu.name_drink} ${menu.name_dessert}`).join(', ')}</td>
                  <td>{commande.articles.map(article => `${article.quantity} ${article.name_article}`).join(', ')}</td>
                  <td>{commande.order_number}</td>
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