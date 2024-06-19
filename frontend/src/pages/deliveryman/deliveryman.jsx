import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Order from '../../components/Order';
import MenuDeliveryman from '../../components/menuDeliveryman';
import '../../styles/deliveryman/deliveryman.css';
import MobileHeader from '../../components/MobileHeader';

const Deliveryman = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const checkOrderStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:4545/orders/status2/${selectedOrder._id}`);
      const currentStatus = response.data;
      console.log(response.data)
      return currentStatus;
    } catch (error) {
      console.error('Error checking order status:', error);
      return false;
    }
  };

  const putOrders = async () => {
    try {
      await axios.put(`http://localhost:4545/orders/status/${selectedOrder._id}/2`);
    }
    catch (error) {
      console.log("Error fetching error", error);
    }
    window.location.href = `/deliverymanOrder?orderId=${selectedOrder._id}`;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4545/orders/status/1');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();

    const intervalId = setInterval(fetchOrders, 15000); // Fetch orders every 15 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrderId(order.order_number);
    setSelectedOrder(order);
  };


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const deliverOrder = async () => {
    if (selectedOrder) {
      try {
        const currentStatus = await checkOrderStatus();
        if (currentStatus.status === 1) {
          await putOrders();
        } else {
          alert("La commande n'est plus disponible");
        }
      } catch (error) {
        console.error('Error delivering order:', error);
      }
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
                id: order.order_number,
                distance: '0 m',
                restaurant: order.restaurant_name,
                montant: `${order.price} €`
              }}
              isSelected={selectedOrderId === order.order_number} // Vérifie si cette commande est sélectionnée
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