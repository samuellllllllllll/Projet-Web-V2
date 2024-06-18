import React from 'react';
import "../../styles/consumer/order2.css";
import Footer from '../../components/Footer.jsx';
import Header from '../../components/Header.jsx';
import livreur from '../../assets/livreur.png';

const Order2 = () => {
    return (
        <div className="order2">
            <Header />
            <div className="content-2">
                <div className="title-section-2">
                    <h2>Suivi commande</h2>
                </div>
                <div className="progress-bar-consommateur-2">
                    <div className="progress-segment-2 step1-consommateur-2"></div>
                    <div className="progress-segment-2 step2-consommateur-2"></div>
                </div>
                <p>Le livreur a récupéré votre commande.</p>
                <p>Il sera bientôt là.</p>
                <img src={livreur} alt="Livreur Icon" className="livrIcon" />
                <p className="delivery-code-title">Code à donner au livreur</p>
                <p className="delivery-code">1234</p>
            </div>
            <Footer />
        </div>
    );
}

export default Order2;
