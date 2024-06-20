import React, { useState, useEffect } from "react";
import "../styles/header.css";
import logo from '../assets/logo.png';
import axios from 'axios';

const Header = () => {
    // State to track the number of products in the cart
    const [countOrder, setCountOrder] = useState(0);
    const [orderTracking, setOrderTracking] = useState([]);

    // Function to update the countOrder from localStorage
    const updateCountOrder = () => {
        const products = localStorage.getItem('products');
        const menus = localStorage.getItem('menus');
        let count = 0;

        if (products) {
            count += JSON.parse(products).length;
        }

        if (menus) {
            count += JSON.parse(menus).length;
        }

        setCountOrder(count);
    };

    // Function to update order tracking
    const updateOrderTracking = async () => {
        try {
            const consumer_id = 1;
            const response = await axios.get(`http://localhost:4545/orders/consumers/${consumer_id}`);
            setOrderTracking(response.data);
        }
        catch (error) {
            console.log(error);
        }
    };

    // useEffect to update the countOrder whenever the component mounts
    useEffect(() => {
        updateCountOrder();
        updateOrderTracking();

        // Add event listeners for both storage changes and custom event
        const handleStorageChange = (event) => {
            if (event.key === 'products' || event.type === 'updateOrder') {
                updateCountOrder();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('updateOrder', handleStorageChange);

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('updateOrder', handleStorageChange);
        };
    }, []);

    return (
        <header className="header">
            <div className="header-left-part">
                <a href="/consommateur"><img className="logo-header" src={logo} alt="logo CESI'Eats" /></a>
                {/* Order tracking */}
                {orderTracking.length > 0 && (
                    <div className="header-order-tracking">
                        <a href="/consommateur/suivi_commande" id="tracking">Commande en cours</a>
                    </div>
                )}
            </div>
            <div className="header-right-part">
                <div className="header-text">
                    <a href="/consommateur/panier" id="order">Panier | {countOrder} </a>
                </div>
                <div className="header-text">
                    <a href="/consommateur/compte" id="account">Mon compte</a>
                </div>
            </div>
        </header>
    );
}

export default Header;