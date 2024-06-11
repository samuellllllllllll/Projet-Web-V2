import React from 'react';
import '../styles/deliverymanOrder3.css';
import logo from '../assets/logo.png';
import menuIcon from '../assets/menu.png';
import valid from '../assets/valid2.png';

const DeliverymanOrder3 = () => {
    return (
        <div className="menu-page">
            <header className="menu-header">
                <img src={logo} alt="logo CESI'Eats" className="logo" />
                <img src={menuIcon} alt="Menu Icon" className="menuIcon" />
            </header>
            <main className="order-details">
                <img src={valid} alt="validation" className="valid" />
                <h1>Commande livrée !</h1>
                <div className="confirm-section">
                    <button className="confirm-button">Retour à l'accueil</button>
                </div>
            </main>
        </div>
    );
}

export default DeliverymanOrder3;
