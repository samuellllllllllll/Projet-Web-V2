import React, { useState } from 'react';
import Order from '../components/Order';
import '../styles/deliveryman.css';
import logo from '../assets/logo.png';
import menuIcon from '../assets/menu.png';

const Deliveryman = () => {
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
          <Order
            order={{ id: 1, distance: '700 m', restaurant: 'Aladdin Kebab - Ravezies', montant: '3,84 €' }}
            isSelected={selectedOrder && selectedOrder.id === 1}
            onClick={handleOrderClick}
          />
          <Order
            order={{ id: 2, distance: '700 m', restaurant: 'Aladdin Kebab - Ravezies', montant: '3,84 €' }}
            isSelected={selectedOrder && selectedOrder.id === 2}
            onClick={handleOrderClick}
          />
          <Order
            order={{ id: 3, distance: '700 m', restaurant: 'Aladdin Kebab - Ravezies', montant: '3,84 €' }}
            isSelected={selectedOrder && selectedOrder.id === 3}
            onClick={handleOrderClick}
          />
          <Order
            order={{ id: 4, distance: '700 m', restaurant: 'Aladdin Kebab - Ravezies', montant: '3,84 €' }}
            isSelected={selectedOrder && selectedOrder.id === 4}
            onClick={handleOrderClick}
          />
          <Order
            order={{ id: 5, distance: '700 m', restaurant: 'Aladdin Kebab - Ravezies', montant: '3,84 €' }}
            isSelected={selectedOrder && selectedOrder.id === 5}
            onClick={handleOrderClick}
          />
        </tbody>
      </table>
      {selectedOrder && (
        <button className="deliver-button" onClick={() => alert(`Commande de ${selectedOrder.restaurant} livrée !`)}>
          Livrer cette commande
        </button>
      )}
    </div>
  );
};

export default Deliveryman;
