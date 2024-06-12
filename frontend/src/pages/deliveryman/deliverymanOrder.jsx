import React, { useState } from 'react';
import '../../styles/deliveryman/deliverymanOrder.css';
import logo from '../../assets/logo.png';
import menuIcon from '../../assets/menu.png';
import MenuDeliveryman from '../../components/menuDeliveryman';
import locationIcon from '../../assets/localisateur.png';
import MobileHeader from '../../components/MobileHeader';

const DeliverymanOrder = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const deliverOrder = () => {
        window.location.href = "/deliverymanOrder2";
    }

    return (
        <div className="menu-page">
            <MobileHeader />
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
                    <button className="confirm-button" onClick={deliverOrder}>Confirmer</button>
                </div>
            </main>
            <MenuDeliveryman isOpen={isMenuOpen} onClose={toggleMenu} activeMenu="deliver" />
        </div>
    );
}

export default DeliverymanOrder;
