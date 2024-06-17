import React, { useState, useRef } from 'react';
import '../../styles/deliveryman/deliverymanOrder2.css';
import locationIcon from '../../assets/localisateur.png';
import MenuDeliveryman from '../../components/menuDeliveryman';
import MobileHeader from '../../components/MobileHeader';

const DeliverymanOrder2 = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [code, setCode] = useState(["", "", "", ""]);

    // Refs for each input field
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCodeChange = (e, index) => {
        const { value } = e.target;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Move focus to the next input field, if not the last one
        if (value.length === 1 && index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
        }
    };

    const deliverOrder = () => {
        if (code.every(digit => digit !== "")) {
            window.location.href = "/deliverymanOrder3";
        } else {
            alert("Veuillez entrer un code valide à 4 chiffres");
        }
    };

    return (
        <div className="menu-page">
            <MobileHeader />
            <main className="order-details">
                <h1>Livrez la commande au client</h1>
                {/* Progress bar and location */}
                <div className="order-location">
                    <img src={locationIcon} alt="Location Icon" className="locationIcon" />
                    <p>2 Pl. Ravezies, 33300 Bordeaux</p>
                </div>
                {/* Code input section */}
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
                                ref={inputRefs[index]} // Set the ref for each input field
                            />
                        ))}
                    </div>
                </div>
                {/* Confirmation button */}
                <div className="confirm-section">
                    <button className="confirm-button" onClick={deliverOrder}>Confirmer</button>
                </div>
            </main>
            <MenuDeliveryman isOpen={isMenuOpen} onClose={toggleMenu} activeMenu="deliver" />
        </div>
    );
};

export default DeliverymanOrder2;
