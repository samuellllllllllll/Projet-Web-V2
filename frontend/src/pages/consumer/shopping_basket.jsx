import React from "react";
import "../../styles/consumer/shopping_basket.css";
import Footer from '../../components/Footer.jsx';
import Header from '../../components/Header.jsx';

const ShoppingBasket = () => {

    const price = 0;
    const restaurant = "Restaurant";

    return (
        <div className="shopping-basket">
            <Header />
            <div className="shopping-basket-container">
                <div className="shopping-basket-title">Mon panier</div>
                <div className="shopping-basket-details">
                    <div className="shopping-basket-details-order">
                        <div className="shopping-basket-details-order-title">{restaurant}</div>
                        <div className="shopping-basket-details-order-value"></div>
                    </div>
                    <div className="shopping-basket-details-separator"></div>
                    <div className="shopping-basket-details-price">
                        <div className="shopping-basket-details-price-title">Total</div>
                        <div className="shopping-basket-details-price-value">{price} €</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ShoppingBasket;