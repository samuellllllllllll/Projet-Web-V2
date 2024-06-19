import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../../styles/deliveryman/deliverymanOrder.css';
import MenuDeliveryman from '../../components/menuDeliveryman';
import locationIcon from '../../assets/localisateur.png';
import MobileHeader from '../../components/MobileHeader';

const DeliverymanOrder = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [restaurantDetails, setRestaurantDetails] = useState(null);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const orderId = params.get('orderId');
    const deliverOrder = () => {
        window.location.href = "/deliverymanOrder2";
    }

    const fetchOrderDetails = async () => {
        try {
            const orderResponse = await axios.get(`http://localhost:4545/orders/${orderId}`);
            setOrderDetails(orderResponse.data);

            const restaurantResponse = await axios.get(`http://localhost:4546/restaurants/address`, {
                params: {
                    restaurant_id: orderResponse.data.restaurant_id
                }
            });
            setRestaurantDetails(restaurantResponse.data[0]);
            console.log(restaurantResponse.data)
        } catch (error) {
            console.error('Error fetching order or restaurant details:', error);
        }
    };

    useEffect(() => {

        if (orderId) {
            fetchOrderDetails();
        }
    }, []);

    if (!orderDetails || !restaurantDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="menu-page">
            <MobileHeader />
            <main className="order-details">
                <h1>Récupérez la commande au restaurant</h1>
                <div className="progress-bar-livreur">
                    <div className="progress-segment-livreur step1-livreur"></div>
                    <div className="progress-segment-livreur step2-livreur"></div>
                </div>
                <div className="order-location">
                    <img src={locationIcon} alt="Location Icon" className="locationIcon" />
                    <p>{restaurantDetails.number} {restaurantDetails.street}, {restaurantDetails.city}</p>
                </div>
                <div className="order-id">
                    <h2>ID commande</h2>
                    <p className="id-number">{orderDetails.order_number}</p>
                </div>
                <div className="confirm-section">
                    <h3>Avez-vous récupéré la commande ?</h3>
                    <button className="confirm-button" onClick={deliverOrder}>Confirmer</button>
                </div>
            </main>
            <MenuDeliveryman isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} activeMenu="deliver" />
        </div>
    );
}

export default DeliverymanOrder;
