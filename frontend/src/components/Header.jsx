import React, { useState, useEffect } from "react";
import "../styles/header.css";
import logo from '../assets/logo.png';

const Header = () => {
    // State to track the number of products in the cart
    const [countOrder, setCountOrder] = useState(0);

    // Function to update the countOrder from localStorage
    const updateCountOrder = () => {
        const products = localStorage.getItem('products');
        if (products !== null) {
            setCountOrder(JSON.parse(products).length);
        } else {
            setCountOrder(0);
        }
    };

    // useEffect to update the countOrder whenever the component mounts
    useEffect(() => {
        updateCountOrder();

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
            <a href="/consommateur"><img className="logo-header" src={logo} alt="logo CESI'Eats" /></a>
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