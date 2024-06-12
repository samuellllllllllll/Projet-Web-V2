import React, { useState } from 'react';
import '../../styles/deliveryman/deliverymanOrder2.css';
import logo from '../../assets/logo.png';
import menuIcon from '../../assets/menu.png';
import locationIcon from '../../assets/localisateur.png';
import MenuDeliveryman from '../../components/menuDeliveryman';
import MobileHeader from '../../components/MobileHeader';

const DeliverymanOrder2 = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [code, setCode] = useState(["", "", "", ""]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCodeChange = (e, index) => {
        const newCode = [...code];
        newCode[index] = e.target.value;
        setCode(newCode);
    };

    const deliverOrder = () => {
        if (code.every(digit => digit !== "")) {
            window.location.href = "/deliverymanOrder3";
        } else {
            alert("Veuillez entrer un code valide à 4 chiffres");
        }
    }

    return (
        <div className="menu-page">
            <MobileHeader />
            <main className="order-details">
                <h1>Livrez la commande au client</h1>
                <div className="progress-bar-2">
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
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleCodeChange(e, index)}
                            />
                        ))}
                    </div>
                </div>
                <div className="confirm-section">
                    <button className="confirm-button" onClick={deliverOrder}>Confirmer</button>
                </div>
            </main>
            <MenuDeliveryman isOpen={isMenuOpen} onClose={toggleMenu} activeMenu="deliver" />
        </div>
    );
}

export default DeliverymanOrder2;
