import React from 'react';
import '../../styles/deliveryman/deliverymanOrder2.css';
import logo from '../../assets/logo.png';
import menuIcon from '../../assets/menu.png';
import locationIcon from '../../assets/localisateur.png';

const DeliverymanOrder2 = () => {
    return (
        <div className="menu-page">
            <header className="menu-header">
                <img src={logo} alt="logo CESI'Eats" className="logo" />
                <img src={menuIcon} alt="Menu Icon" className="menuIcon" />
            </header>
            <main className="order-details">
                <h1>Livrez la commande au client</h1>
                <div className="progress-bar">
                    <div className="step1 active"></div>
                    <div className="step2"></div>
                </div>
                <div className="order-location">
                    <img src={locationIcon} alt="Location Icon" className="locationIcon" />
                    <p>2 Pl. Ravezies, 33300 Bordeaux</p>
                </div>
                <div className='order-code'>
                    <h2>Demandez le code au client et rentrez le pour confirmer la livraison</h2>
                    <div className="code-input">
                        <input type="text" maxLength="1" />
                        <input type="text" maxLength="1" />
                        <input type="text" maxLength="1" />
                        <input type="text" maxLength="1" />
                    </div>
                </div>
                <div className="confirm-section">
                    <button className="confirm-button">Confirmer</button>
                </div>
            </main>
        </div>
    );
}

export default DeliverymanOrder2;
