import React from "react";
import "../../styles/consumer/shopping_basket.css";
import Footer from '../../components/Footer.jsx';
import Header from '../../components/Header.jsx';

const ShoppingBasket = () => {

    // The detail of the order is stored in the local storage
    const products = JSON.parse(localStorage.getItem('products'));
    const menus = JSON.parse(localStorage.getItem('menus'));

    return (
        <div className="shopping-basket">
            <Header />
            <div className="shopping-basket-container">
                <div className="shopping-basket-title">Mon panier</div>
                <div className="shopping-basket-details">
                    <div className="shopping-basket-details-order">
                        <div className="shopping-basket-details-order-menus">
                        <div className="shopping-basket-details-order-menus-title">Menus</div>
                            {/* If the list of menus is empty we display a message */}
                            {menus === null || menus.length === 0 ? <div className="shopping-basket-details-order-empty">Aucun menu</div> : 
                                menus.map((menu, index) => {
                                    return (
                                        <div key={index} className="shopping-basket-details-order-menu">
                                            <div className="shopping-basket-details-order-menu-name">{menu.name}</div>
                                            <div className="shopping-basket-details-order-menu-price">{menu.price} €</div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                        <div className="shopping-basket-details-order-products">
                            <div className="shopping-basket-details-order-products-title">Articles simples</div>
                            {/* If the list of products is empty we display a message */}
                            {products === null || products.length === 0 ? <div className="shopping-basket-details-order-empty">Aucun produit</div> : 
                                products.map((product, index) => {
                                    return (
                                        <div key={index} className="shopping-basket-details-order-product">
                                            <div className="shopping-basket-details-order-product-name">{product.name}</div>
                                            <div className="shopping-basket-details-order-product-price">{product.price} €</div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                    <div className="shopping-basket-details-separator"></div>
                    {/* <div className="shopping-basket-details-price">
                        <div className="shopping-basket-details-price-title">Total</div>
                        <div className="shopping-basket-details-price-value">
                            {order === null ? 0 : order.reduce((acc, product) => acc + product.price, 0)} €
                        </div>
                        <div className="shopping-basket-checkout">
                            <button className="shopping-basket-checkout-button" onClick={ () => sendOrder() }>Commander</button>
                            <div className="shopping-basket-checkout-alert"></div>
                        </div>
                    </div> */}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ShoppingBasket;