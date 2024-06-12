import React, { useState } from 'react';
import Order from '../../components/Order';
import MenuDeliveryman from '../../components/menuDeliveryman';
import '../../styles/deliveryman/deliveryman.css';
import logo from '../../assets/logo.png';
import menuIcon from '../../assets/menu.png';
import MobileHeader from '../../components/MobileHeader';

const Deliveryman = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const deliverOrder = () => {
    if (selectedOrder) {
      window.location.href = "/deliverymanOrder";
    }
  };

  return (
    <div className="menu-page">
      <MobileHeader />
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
          {[1, 2, 3, 4, 5].map((id) => (
            <Order
              key={id}
              order={{ id, distance: '700 m', restaurant: 'Aladdin Kebab - Ravezies', montant: '3,84 €' }}
              isSelected={selectedOrder && selectedOrder.id === id}
              onClick={handleOrderClick}
            />
          ))}
        </tbody>
      </table>
      {selectedOrder && (
        <button className="deliver-button" onClick={deliverOrder}>
          Livrer cette commande
        </button>
      )}
      <MenuDeliveryman isOpen={isMenuOpen} onClose={toggleMenu} activeMenu="deliver" />
    </div>
  );
};

export default Deliveryman;
