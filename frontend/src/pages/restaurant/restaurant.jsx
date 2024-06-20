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
  const [commandesAFaire, setCommandesAFaire] = useState([]);

  const convertDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const hours = (date.getUTCHours() + 2).toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');

    const formattedDate = `${hours}:${minutes}`;
    return formattedDate;
}


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

  const fetchOrdersToMake = async () => {
    try {
      const response = await axios.get('http://localhost:4545/orders/status/1');
      setCommandesAFaire(response.data);
      console.log(response.data);
    }
    catch (error){
      console.log("Error retrieving orders to make", error);
    }
  }
  useEffect(() => {

    fetchOrders();
    fetchOrdersToMake();

    const intervalId = setInterval(fetchOrders, 15000); // Fetch orders every 15 seconds
    const intervalIdToMake = setInterval(fetchOrdersToMake, 15000);

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalIdToMake);
    }; // Cleanup interval on component unmount
  }, []);

  const toggleButton = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const handleAccept = (index, order_id) => {
    const acceptedCommande = testOrders[index];
    setOrders(testOrders.filter((_, i) => i !== index));
    setCommandesAFaire([...commandesAFaire, acceptedCommande]);
    const putOrders = async () => {
      try{
        await axios.put(`http://localhost:4545/orders/status/${order_id}/1`);
      }
      catch(error){
        console.log("Error fetching error", error);
      }
    };
    putOrders();
  };
  

  const handleDeny = (index, order_id) => {
    setOrders(testOrders.filter((_, i) => i !== index));
    const denyOrders = async ()=>{
      try{
        await axios.put(`http://localhost:4545/orders/status/${order_id}/-1`);
      }
      catch (error){
        console.log("Error fetching error", error);
      }
    };
    denyOrders();
  };

  return (

    <div className="menu-page">
      <MobileHeader2 />
      <main className="menu-content-restaurant">
        <div className="Menu-bottom-button-box">
          <div className="Menu-bottom-button-box-text">Mon restaurant est ...</div>
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
              <th>Menus</th>
              <th>Articles</th>
              <th>ID</th>
              <th>Heure de récupération</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {testOrders.length > 0 ? (
              testOrders.map((commande, index) => (
                <tr key={index}>
                  <td>{commande.menus.map(menu=> `${menu.quantity} ${menu.name_starter} ${menu.name_main_dish} ${menu.name_drink} ${menu.name_dessert}`).join(', ')}</td>
                  <td>{commande.articles.map(article => `${article.quantity} ${article.name_article}`).join(', ')}</td>
                  <td>{commande.order_number}</td>
                  <td>{convertDate(commande.date_and_time)}</td>
                  <td className="bouttons-commandes">
                    <button className="accepter" onClick={() => handleAccept(index, commande._id)}>
                      <img src={accept} alt="Accept" className="accepter-img" />
                    </button>
                    <button className="refuser" onClick={() => handleDeny(index, commande._id)}>
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
              <th>Menus</th>
              <th>Articles</th>
              <th>ID</th>
              <th>Heure de récupération</th>
            </tr>
          </thead>
          <tbody>
            {commandesAFaire.length > 0 ? (
              commandesAFaire.map((commande, index) => (
                <tr key={index}>
                  <td>{commande.menus.map(menu=> `${menu.quantity} ${menu.name_starter} ${menu.name_main_dish} ${menu.name_drink} ${menu.name_dessert}`).join(', ')}</td>
                  <td>{commande.articles.map(article => `${article.quantity} ${article.name_article}`).join(', ')}</td>
                  <td>{commande.order_number}</td>
                  <td>{convertDate(commande.date_and_time)}</td>
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
    </div>
  );
};

export default Restaurant;