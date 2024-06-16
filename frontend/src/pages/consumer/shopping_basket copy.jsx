import React from "react";
import "../../styles/consumer/shopping_basket.css";
import Footer from '../../components/Footer.jsx';
import Header from '../../components/Header.jsx';

const ShoppingBasket = () => {

    // The detail of the order is stored in the local storage
    const products = JSON.parse(localStorage.getItem('products'));
    const menus = JSON.parse(localStorage.getItem('menus'));
    

    // If the element #delete is clicked, we delete the product from the local storage
    // If the product is only once in the order, we delete it
    // Otherwise we decrease the number of the product by 1
    // document.addEventListener('click', (e) => {
    //     if (e.target.id === 'delete') {
    //         const id = e.target.parentElement.parentElement.querySelector('.shopping-basket-details-order-item-left-name').textContent;
    //         const order = JSON.parse(localStorage.getItem('products'));
    //         if (order.filter(product => product.name === id).length === 1) {
    //             const newOrder = order.filter(product => product.name !== id);
    //             localStorage.setItem('products', JSON.stringify(newOrder));
    //         }
    //         else {
    //             const newOrder = [...order];
    //             newOrder.splice(newOrder.findIndex(product => product.name === id), 1);
    //             localStorage.setItem('products', JSON.stringify(newOrder));
    //         }
    //         window.location.reload();
    //     }
    // });

    // // If the element #add is clicked, we add the product to the local storage
    // document.addEventListener('click', (e) => {
    //     if (e.target.id === 'add') {
    //         const id = e.target.parentElement.parentElement.querySelector('.shopping-basket-details-order-item-left-name').textContent;
    //         const order = JSON.parse(localStorage.getItem('products'));
    //         const newOrder = [...order, order.find(product => product.name === id)];
    //         localStorage.setItem('products', JSON.stringify(newOrder));
    //         window.location.reload();
    //     }
    // });

    // const sendOrder = () => {
    //     const order = JSON.parse(localStorage.getItem('products'));
    //     if (order === null || order.length === 0) {
    //         // If the order is empty we display a message for 3 seconds
    //         document.querySelector('.shopping-basket-checkout-alert').textContent = 'Votre panier est vide';
    //         setTimeout(() => {
    //             document.querySelector('.shopping-basket-checkout-alert').textContent = '';
    //         }, 3000);
    //     }
    //     else {
    //         document.querySelector('.shopping-basket-checkout-alert').textContent = 'Commande envoyée';
    //         localStorage.removeItem('products');
    //         window.location.reload();
    //     }
    // }

    return (
        <div className="shopping-basket">
            <Header />
            <div className="shopping-basket-container">
                <div className="shopping-basket-title">Mon panier</div>
                <div className="shopping-basket-details">
                    <div className="shopping-basket-details-order">
                        <div className="shopping-basket-details-order-value">
                            {/* If the list of products and the list of menus are empty we display a message */}
                            {(products === null || products.length === 0) && (menus === null || menus.length === 0) ? <div className="shopping-basket-details-order-empty">Votre panier est vide</div> :

                                // Otherwise we display the list of products in the order
                                // Group the products by their id and count the number of each product
                                // For the price we multiply the price of the product by the number of products
                                Object.entries(order.reduce((acc, product) => {
                                    if (acc[product.id] === undefined) {
                                        acc[product.id] = { ...product, count: 1, price: product.price };
                                    } else {
                                        acc[product.id].count++;
                                    }
                                    return acc;
                                }, {})).map(([key, value]) => (
                                    <div key={key} className="shopping-basket-details-order-item">
                                        <div className="shopping-basket-details-order-item-left">
                                            <div className="shopping-basket-details-order-item-image">
                                                <img src={value.image} alt={value.name} />     
                                            </div>
                                            <div className="shopping-basket-details-order-item-left-text">
                                            <div className="shopping-basket-details-order-item-left-restaurant-name">{value.restaurant_name}</div>
                                                <div className="shopping-basket-details-order-item-left-name">{value.name}</div>
                                                <div className="shopping-basket-details-order-item-left-price">{value.price} €</div>
                                            </div>
                                        </div>
                                        <div className="shopping-basket-details-order-item-right">
                                            <i className="uil uil-trash" id="delete"></i>
                                            <div className="shopping-basket-details-order-item-right-quantity">{value.count}</div>
                                            <i className="uil uil-plus" id="add"></i>
                                        </div>
                                    </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                    <div className="shopping-basket-details-separator"></div>
                    <div className="shopping-basket-details-price">
                        <div className="shopping-basket-details-price-title">Total</div>
                        <div className="shopping-basket-details-price-value">
                            {/* If order is empty we display 0 */}
                            {order === null ? 0 : order.reduce((acc, product) => acc + product.price, 0)} €
                        </div>
                        <div className="shopping-basket-checkout">
                            <button className="shopping-basket-checkout-button" onClick={ () => sendOrder() }>Commander</button>
                            <div className="shopping-basket-checkout-alert"></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ShoppingBasket;