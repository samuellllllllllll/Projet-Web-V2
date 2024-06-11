import React from 'react';
import '../../styles/deliveryman/deliverymanOrder.css';
import logo from '../../assets/logo.png';
import menuIcon from '../../assets/menu.png';
import locationIcon from '../../assets/localisateur.png';

const DeliverymanOrder = () => {
    return (
        <div className="menu-page">
            <header className="menu-header">
                <img src={logo} alt="logo CESI'Eats" className="logo" />
                <img src={menuIcon} alt="Menu Icon" className="menuIcon" />
            </header>
            <main className="order-details">
                <h1>Récupérez la commande au restaurant</h1>
                <div className="progress-bar">
                    <div className="step1 active"></div>
                    <div className="step2"></div>
                </div>
                <div className="order-location">
                    <img src={locationIcon} alt="Location Icon" className="locationIcon" />
                    <p>2 Pl. Ravezies, 33300 Bordeaux</p>
                </div>
                <div className="order-id">
                    <h2>ID commande</h2>
                    <p className="id-number">6245</p>
                </div>
                <div className="confirm-section">
                    <h3>Avez-vous récupéré la commande ?</h3>
                    <button className="confirm-button">Confirmer</button>
                </div>
            </main>
        </div>
    );
}

export default DeliverymanOrder;
