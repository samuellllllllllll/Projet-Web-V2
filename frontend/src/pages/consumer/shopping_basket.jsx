import React from "react";
import "../../styles/consumer/shopping_basket.css";
import Footer from '../../components/Footer.jsx';
import Header from '../../components/Header.jsx';

const ShoppingBasket = () => {

    return (
        <div className="shopping-basket">
            <Header />
            <div className="shopping-basket-container">
                <div className="shopping-basket-title">Votre panier</div>
                <div className="shopping-basket-details">
                    <div className="shopping-basket-details-order"></div>
                    <div className="shopping-basket-details-separator"></div>
                    <div className="shopping-basket-details-price"></div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ShoppingBasket;