import React, { useState, useRef, useEffect } from 'react';
import '../../styles/deliveryman/deliverymanOrder2.css';
import locationIcon from '../../assets/localisateur.png';
import MenuDeliveryman from '../../components/menuDeliveryman';
import MobileHeader from '../../components/MobileHeader';
import axios from 'axios';

const DeliverymanOrder2 = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [code, setCode] = useState(["", "", "", ""]);
    const [orderDetails, setOrderDetails] = useState(null);
    const params = new URLSearchParams(location.search);
    const orderId = params.get('orderId');

    const fetchOrderDetails = async () => {
        try {
            const orderResponse = await axios.get(`http://localhost:4545/orders/${orderId}`);
            setOrderDetails(orderResponse.data);
            console.log(orderResponse.data);
        } catch (error) {
            console.error('Error fetching order or restaurant details:', error);
        }
    };

    useEffect(() => {

        if (orderId) {
            fetchOrderDetails();
        }
    }, []);

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

    const deliverOrder = async () => {
        try {
            // Check if all digits are entered
            if (code.every(digit => digit !== "")) {
                // Construct the entered code as a string
                const enteredCode = code.join("");

                // Check if the entered code matches the expected code from orderDetails
                if (enteredCode === orderDetails.validation_code.toString().trim()) {
                    // Navigate to the next page if the codes match
                    window.location.href = "/deliverymanOrder3";
                } else {
                    alert("Le code entré ne correspond pas. Veuillez réessayer.");
                }
            } else {
                alert("Veuillez entrer un code valide à 4 chiffres.");
            }
        } catch (error) {
            console.error('Error delivering order:', error);
            alert("Une erreur s'est produite lors de la livraison de la commande.");
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
