import React from "react";
import "../../styles/consumer/shopping_basket.css";
import Footer from '../../components/Footer.jsx';
import Header from '../../components/Header.jsx';
import axios from "axios";

const ShoppingBasket = () => {

    // The detail of the order is stored in the local storage
    const products = JSON.parse(localStorage.getItem('products'));
    const menus = JSON.parse(localStorage.getItem('menus'));

    // If the element #delete is clicked, we delete the product from the local storage
    // If the product is only once in the order, we delete it
    // Otherwise we decrease the number of the product by 1
    document.addEventListener('click', (e) => {
        if (e.target.id === 'delete-product') {
            const id = e.target.parentElement.parentElement.querySelector('.shopping-basket-details-order-item-left-name').textContent;
            const order = JSON.parse(localStorage.getItem('products'));
            if (order.filter(product => product.name === id).length === 1) {
                const newOrder = order.filter(product => product.name !== id);
                localStorage.setItem('products', JSON.stringify(newOrder));
            }
            else {
                const newOrder = [...order];
                newOrder.splice(newOrder.findIndex(product => product.name === id), 1);
                localStorage.setItem('products', JSON.stringify(newOrder));
            }
            window.location.reload();
        }
    });

    // If the element #add is clicked, we add the product to the local storage
    document.addEventListener('click', (e) => {
        if (e.target.id === 'add-product') {
            const id = e.target.parentElement.parentElement.querySelector('.shopping-basket-details-order-item-left-name').textContent;
            const order = JSON.parse(localStorage.getItem('products'));
            const newOrder = [...order, order.find(product => product.name === id)];
            localStorage.setItem('products', JSON.stringify(newOrder));
            window.location.reload();
        }
    });

    const deleteMenu = (id_menu) => {
        const order = JSON.parse(localStorage.getItem('menus'));
        if (order.filter(menu => menu.id_menu_panier === id_menu).length === 1) {
            const newOrder = order.filter(menu => menu.id_menu_panier !== id_menu);
            localStorage.setItem('menus', JSON.stringify(newOrder));
        }
        else {
            const newOrder = [...order];
            newOrder.splice(newOrder.findIndex(menu => menu.id_menu_panier === id_menu), 1);
            localStorage.setItem('menus', JSON.stringify(newOrder));
        }
        window.location.reload();
    }

    const addMenu = (id_menu) => {
        const order = JSON.parse(localStorage.getItem('menus'));
        const newOrder = [...order, order.find(menu => menu.id_menu_panier === id_menu)];
        localStorage.setItem('menus', JSON.stringify(newOrder));
        window.location.reload();
    }

    const sendOrder = () => {
        const menus = JSON.parse(localStorage.getItem('menus'));
        const products = JSON.parse(localStorage.getItem('products'));
        
        // If the order is empty we display a message for 3 seconds
        if ((menus === null || menus.length === 0) && (products === null || products.length === 0)) {
            document.querySelector('.shopping-basket-checkout-alert').textContent = 'Votre panier est vide';
            setTimeout(() => {
                document.querySelector('.shopping-basket-checkout-alert').textContent = '';
            }, 3000);
        }
        else {
            // We check if all the menus and products are from the same restaurant
            // If not we display a message for 3 seconds
            let restaurant = null;
            if (menus !== null && menus.length !== 0) {
                restaurant = menus[0].name_restaurant;
            }
            else if (products !== null && products.length !== 0) {
                restaurant = products[0].restaurant_name;
            }
            let sameRestaurant = true;
            if (menus !== null) {
                for (let i = 0; i < menus.length; i++) {
                    if (menus[i].name_restaurant !== restaurant) {
                        sameRestaurant = false;
                        break;
                    }
                }
            }
            if (products !== null) {
                for (let i = 0; i < products.length; i++) {
                    if (products[i].restaurant_name !== restaurant) {
                        sameRestaurant = false;
                        break;
                    }
                }
            }
            if (!sameRestaurant) {
                document.querySelector('.shopping-basket-checkout-alert').textContent = 'Les produits ne sont pas du même restaurant';
                setTimeout(() => {
                    document.querySelector('.shopping-basket-checkout-alert').textContent = '';
                }, 3000);
            }
            else {
                const id_consumer = 1; /// TO BE CHANGED
                const price = (products === null || products.length === 0 ? 0 : products.reduce((acc, product) => acc + product.price, 0)) + (menus === null || menus.length === 0 ? 0 : menus.reduce((acc, menu) => acc + menu.price, 0));
                const restaurant_name = (menus === null || menus.length === 0 ? products[0].restaurant_name : menus[0].name_restaurant);
                
                // Modify the menus to match the format of the server
                // If menu not null
                if (menus !== null) {
                    var newMenus = menus.map(menu => {
                        return {
                            id_menu: menu.menu_id,
                            name_menu: menu.name,
                            id_starter: menu.id_starter,
                            name_starter: menu.name_starter,
                            id_main_dish: menu.id_main_dish,
                            name_main_dish: menu.name_main_dish,
                            id_dessert: menu.id_dessert,
                            name_dessert: menu.name_dessert,
                            id_drink: menu.id_drink,
                            name_drink: menu.name_drink,
                            quantity: 1,
                        }
                    });
                }

                // Modify the products to match the format of the server
                if (products !== null) {
                    var newProducts = products.map(product => {
                        return {
                            id_article: product.id,
                            name_article: product.name,
                            quantity: 1,
                        }
                    });
                }

                // Wait for 30 seconds
                setTimeout(() => {
                    document.querySelector('.shopping-basket-checkout-alert').textContent = 'Commande en cours';
                }, 30000);

                // Send the order to the server
                try {
                    const response = axios.post('http://localhost:4545/orders', {
                        params: {
                            id_consumer: id_consumer,
                            id_restaurant: (menus === null || menus.length === 0 ? products[0].id_restaurant : menus[0].id_restaurant),
                            restaurant_name: restaurant_name,                                                                                            
                            id_delivery_person: null,
                            price: price,
                            menus: (menus === null ? [] : newMenus),
                            articles: (products === null ? [] : newProducts),
                        },
                    });
                } catch (error) {
                    console.error('Error sending order:', error);
                }
                
                document.querySelector('.shopping-basket-checkout-alert').textContent = 'Commande envoyée';
                
                // Display a message for 3 seconds
                setTimeout(() => {
                    document.querySelector('.shopping-basket-checkout-alert').textContent = '';
                    localStorage.removeItem('products');
                    localStorage.removeItem('menus');
                    window.location.reload();
                }, 3000);
            }
        }
    }

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
                                
                                // Otherwise we display the list of menus in the order
                                // Group the menus by the menu_id_panier of the menu and count the number of each menu
                                // For the price we multiply the price of the menu by the number of menus
                                Object.entries(menus.reduce((acc, menu) => {
                                    if (acc[menu.id_menu_panier] === undefined) {
                                        acc[menu.id_menu_panier] = { ...menu, count: 1};
                                    } else {
                                        acc[menu.id_menu_panier].count++;
                                    }
                                    return acc;
                                }, {})).map(([key, value]) => (
                                    <div key={key} className="shopping-basket-details-order-item">
                                        <div className="shopping-basket-details-order-item-left">
                                            <div className="shopping-basket-details-order-item-image">
                                                <img src={value.image} alt={value.name} />     
                                            </div>
                                            <div className="shopping-basket-details-order-item-left-text">
                                                <div className="shopping-basket-details-order-item-left-restaurant-name">{value.name_restaurant}</div>
                                                <div className="shopping-basket-details-order-item-left-name">{value.name}</div>
                                                <div className="shopping-basket-details-order-item-left-price">{value.price} €</div>
                                                {/* Show items in the menu */}
                                                <div className="shopping-basket-details-order-item-left-items">
                                                    {value.name_starter !== "" ? <div className="shopping-basket-details-order-item-left-item">- {value.name_starter}</div> : null}
                                                    {value.name_main_dish !== "" ? <div className="shopping-basket-details-order-item-left-item">- {value.name_main_dish}</div> : null}
                                                    {value.name_dessert !== "" ? <div className="shopping-basket-details-order-item-left-item">- {value.name_dessert}</div> : null}
                                                    {value.name_drink !== "" ? <div className="shopping-basket-details-order-item-left-item">- {value.name_drink}</div> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="shopping-basket-details-order-item-right">
                                            <i className="uil uil-trash" id="delete-menu" onClick={() => deleteMenu(value.id_menu_panier)}></i>
                                            <div className="shopping-basket-details-order-item-right-quantity">{value.count}</div>
                                            <i className="uil uil-plus" id="add-menu" onClick={() => addMenu(value.id_menu_panier)}></i>
                                        </div>
                                    </div>
                                    )
                                )
                            }
                        </div>
                        <div className="shopping-basket-details-order-products">
                            <div className="shopping-basket-details-order-products-title">Articles simples</div>
                            
                            {/* If the list of products is empty we display a message */}
                            {products === null || products.length === 0 ? <div className="shopping-basket-details-order-empty">Aucun article</div> : 
                                
                                // Otherwise we display the list of products in the order
                                // Group the products by their id and count the number of each product
                                // For the price we multiply the price of the product by the number of products
                                Object.entries(products.reduce((acc, product) => {
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
                                            <i className="uil uil-trash" id="delete-product"></i>
                                            <div className="shopping-basket-details-order-item-right-quantity">{value.count}</div>
                                            <i className="uil uil-plus" id="add-product"></i>
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
                            {/* If products and menus are empty we display 0 */}
                            {// Otherwise we display the total price of the order
                            (products === null || products.length === 0) && (menus === null || menus.length === 0) ? 0 : 
                                (products === null || products.length === 0 ? 0 : products.reduce((acc, product) => acc + product.price, 0)) + 
                                (menus === null || menus.length === 0 ? 0 : menus.reduce((acc, menu) => acc + menu.price, 0))
                            } €
                        </div>
                        <div className="shopping-basket-checkout">
                            <button className="shopping-basket-checkout-button" 
                                onClick={ () => sendOrder() }>Commander</button>
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