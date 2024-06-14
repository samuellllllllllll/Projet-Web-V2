import React, { useState, useEffect } from "react";
import "../styles/Restaurant_page.css";
import Footer from './Footer.jsx'
import Header from './Header.jsx';
import Product_card_consumer from '../components/Product_card_consumer.jsx';
import Menu_card_consumer from '../components/Menu_card_consumer.jsx';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Restaurant_page = () => {

    const location = useLocation();
    const { id, name, image } = location.state || {};

    const [menus, setMenus] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getMenus = async () => {
            try {
                const response = await axios.get('http://localhost:4546/restaurants/menus', {
                    params: { id_user: id },
                });
                setMenus(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        const getProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4548/articles/restaurant', {
                    params: { user_id: id },
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        getMenus();
        getProducts();
    }, [id]);

    return (
        <div className="restaurant-page">
            <Header />
            <div className="restaurant-page-container">
                <div className="restaurant-page-container-top">
                    <div className="restaurant-page-container-top-arrow">
                        <a href="/consommateur"><i className="uil uil-arrow-left" id="arrow"></i></a>
                    </div>
                    <img src={image} alt="restaurant" />
                </div>
                <div className="restaurant-page-container-title">
                    <div className="restaurant-page-container-title-text">{name}</div>
                </div>
                <div className="restaurant-page-container-product">
                    <div className="restaurant-page-container-product-title">
                        <div className="restaurant-page-container-product-title-text">Menu</div>
                    </div>
                    <div className="restaurant-page-container-product-cards">
                        {menus.map((menu) => (
                            <Menu_card_consumer id={menu.id} name={menu.name} price={menu.price} image={image} />
                        ))}
                    </div>
                </div>
                <div className="restaurant-page-container-product">
                    <div className="restaurant-page-container-product-title">
                        <div className="restaurant-page-container-product-title-text">Entrée</div>
                    </div>
                    <div className="restaurant-page-container-product-cards">
                        {/* Only products with category=0 */}
                        {/* If products is empty show a message */}
                        {products.filter(product => product.category === 0).length === 0 ? <div className="restaurant-page-container-product-cards-empty">Ce restaurant n'a pas d'entrée</div> : products.filter(product => product.category === 0).map((product) => (
                            <Product_card_consumer id={product.id} name={product.name} price={product.price + ' €'} image={product.image} />
                        ))}
                    </div>
                </div>
                <div className="restaurant-page-container-product">
                    <div className="restaurant-page-container-product-title">
                        <div className="restaurant-page-container-product-title-text">Plat</div>
                    </div>
                    <div className="restaurant-page-container-product-cards">
                        {/* Only products with category=1 */}
                        {/* If products is empty show a message */}
                        {products.filter(product => product.category === 1).length === 0 ? <div className="restaurant-page-container-product-cards-empty">Ce restaurant n'a pas de plat</div> : products.filter(product => product.category === 1).map((product) => (
                            <Product_card_consumer id={product.id} name={product.name} price={product.price + ' €'} image={product.url_picture} />
                        ))}
                    </div>
                </div>
                <div className="restaurant-page-container-product">
                    <div className="restaurant-page-container-product-title">
                        <div className="restaurant-page-container-product-title-text">Dessert</div>
                    </div>
                    <div className="restaurant-page-container-product-cards">
                        {/* Only products with category=2 */}
                        {/* If products is empty show a message */}
                        {products.filter(product => product.category === 2).length === 0 ? <div className="restaurant-page-container-product-cards-empty">Ce restaurant n'a pas de dessert</div> : products.filter(product => product.category === 2).map((product) => (
                            <Product_card_consumer id={product.id} name={product.name} price={product.price + ' €'} image={product.url_picture} />
                        ))}
                    </div>
                </div>
                <div className="restaurant-page-container-product">
                    <div className="restaurant-page-container-product-title">
                        <div className="restaurant-page-container-product-title-text">Boisson</div>
                    </div>
                    <div className="restaurant-page-container-product-cards">
                        {/* Only products with category=3 */}
                        {/* If products is empty show a message */}
                        {products.filter(product => product.category === 3).length === 0 ? <div className="restaurant-page-container-product-cards-empty">Ce restaurant n'a pas de boisson</div> : products.filter(product => product.category === 3).map((product) => (
                            <Product_card_consumer id={product.id} name={product.name} price={product.price + ' €'} image={product.url_picture} />
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Restaurant_page;