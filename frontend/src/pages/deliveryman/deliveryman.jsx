import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Order from '../../components/Order';
import MenuDeliveryman from '../../components/menuDeliveryman';
import '../../styles/deliveryman/deliveryman.css';
import MobileHeader from '../../components/MobileHeader';

const Deliveryman = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4545/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

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
          {orders.map(order => (
            <Order
              key={order._id}
              order={{
                id: order._id,
                distance: '0 m',
                restaurant: restaurant_name,
                montant: `${order.price} €`
              }}
              isSelected={selectedOrder && selectedOrder.id === order._id}
              onClick={() => handleOrderClick(order)}
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
