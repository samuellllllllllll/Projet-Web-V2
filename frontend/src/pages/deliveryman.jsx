import React, { useState } from 'react';
import '../styles/deliveryman.css';
import logo from '../assets/logo.png';
import menuIcon from '../assets/menu.png';

const Deliveryman = () => {
  const [orders, setOrders] = useState([
    { id: 1, distance: '700 m', restaurant: 'Aladdin Kebab - Ravezies', montant: '3,84 €' },
    { id: 2, distance: '700 m', restaurant: 'Aladdin Kebab - Ravezies', montant: '3,84 €' },
    { id: 3, distance: '700 m', restaurant: 'Aladdin Kebab - Ravezies', montant: '3,84 €' },
    { id: 4, distance: '700 m', restaurant: 'Aladdin Kebab - Ravezies', montant: '3,84 €' },
    { id: 5, distance: '700 m', restaurant: 'Aladdin Kebab - Ravezies', montant: '3,84 €' },
  ]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="menu-page">
      <header className="menu-header">
        <img src={logo} alt="logo CESI'Eats" className="logo" />
        <img src={menuIcon} alt="Menu Icon" className="menuIcon" />
      </header>
      <h1>Choisissez une commande à livrer</h1>
      <table>
        <thead className='bottom'>
          <tr>
            <th>Distance</th>
            <th>Restaurant</th>
            <th>Montant</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr
              key={order.id}
              className={`order-row ${selectedOrder === order ? 'selected' : ''}`}
              onClick={() => handleOrderClick(order)}
            >
              <td>{order.distance}</td>
              <td>{order.restaurant}</td>
              <td>{order.montant}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="deliver-button">Livrer cette commande</button>
    </div>
  );
};

export default Deliveryman;