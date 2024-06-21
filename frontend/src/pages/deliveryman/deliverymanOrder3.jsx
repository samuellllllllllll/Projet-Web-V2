import React, { useState } from 'react';
import '../../styles/deliveryman/deliverymanOrder3.css';
import logo from '../../assets/logo.png';
import menuIcon from '../../assets/menu.png';
import valid from '../../assets/valid2.png';
import MenuDeliveryman from '../../components/menuDeliveryman';
import MobileHeader from '../../components/MobileHeader';

const DeliverymanOrder3 = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCodeChange = (e, index) => {
        const newCode = [...code];
        newCode[index] = e.target.value;
        setCode(newCode);
    };

    const deliverOrder = () => {
        window.location.href = "/livreur";
    }

    return (
        <div className="menu-page">
            <MobileHeader />
            <main className="order-details">
                <img src={valid} alt="validation" className="icone-de-validation" />
                <h1>Commande livrée !</h1>
                <div className="confirm-section">
                    <button className="confirm-button" onClick={deliverOrder} >Retour à l'accueil</button>
                </div>
            </main>
            <MenuDeliveryman isOpen={isMenuOpen} onClose={toggleMenu} activeMenu="deliver" />
        </div>
    );
}

export default DeliverymanOrder3;
