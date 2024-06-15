import React from 'react';
import "../../styles/consumer/order1.css";
import Footer from '../../components/Footer.jsx';
import Header from '../../components/Header.jsx';
import preparation from '../../assets/preparer.png';

const Order1 = () => {
    return (
        <div className="order1">
            <Header />
            <div className="content">
                <div className="title-section">
                    <h2>Suivi commande</h2>
                </div>
                <div className="progress-bar-consommateur">
                    <div className="step1-consommateur active-consommateur"></div>
                    <div className="step2-consommateur"></div>
                </div>
                <p>Le restaurant prépare votre commande</p>
                <img src={preparation} alt="Preparation Icon" className="preparIcon" />
            </div>
            <Footer />
        </div>
    );
}

export default Order1;
