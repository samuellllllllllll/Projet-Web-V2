import React from "react";
import "../styles/Restaurant_page.css";
import Footer from './Footer.jsx'
import Header from './Header.jsx';
import Product_card_consumer from '../components/Product_card_consumer.jsx';

const Restaurant_page = () => {
    return (
        <div className="restaurant-page">
            <Header />
            <div className="restaurant-page-container">
                <div className="restaurant-page-container-top">
                    <div className="restaurant-page-container-top-arrow">
                        <a href="/consommateur"><i class="uil uil-arrow-left" id="arrow"></i></a>
                    </div>
                    <img src="https://cdn.generationvoyage.fr/2020/10/kebab-cta-755x504.jpg" alt="Banière restaurant" />
                </div>
                <div className="restaurant-page-container-title">
                    <div className="restaurant-page-container-title-text">Aladdin</div>
                </div>
                <div className="restaurant-page-container-product">
                    <div className="restaurant-page-container-product-title">
                        <div className="restaurant-page-container-product-title-text">Menu</div>
                    </div>
                    <div className="restaurant-page-container-product-cards">
                        <Product_card_consumer name="Menu Plat + Boisson" price="10€" images="https://cdn.generationvoyage.fr/2020/10/kebab-cta-755x504.jpg" />
                        <Product_card_consumer name="Menu Plat + Dessert" price="11€" images="https://cdn.generationvoyage.fr/2020/10/kebab-cta-755x504.jpg" />
                    </div>
                </div>
                <div className="restaurant-page-container-product">
                    <div className="restaurant-page-container-product-title">
                        <div className="restaurant-page-container-product-title-text">Entrée</div>
                    </div>
                    <div className="restaurant-page-container-product-cards">
                        <Product_card_consumer name="Menu Plat + Boisson" price="10€" images="https://cdn.generationvoyage.fr/2020/10/kebab-cta-755x504.jpg" />
                        <Product_card_consumer name="Menu Plat + Dessert" price="11€" images="https://cdn.generationvoyage.fr/2020/10/kebab-cta-755x504.jpg" />
                    </div>
                </div>
                <div className="restaurant-page-container-product">
                    <div className="restaurant-page-container-product-title">
                        <div className="restaurant-page-container-product-title-text">Plat</div>
                    </div>
                    <div className="restaurant-page-container-product-cards">
                        <Product_card_consumer name="Menu Plat + Boisson" price="10€" images="https://cdn.generationvoyage.fr/2020/10/kebab-cta-755x504.jpg" />
                        <Product_card_consumer name="Menu Plat + Dessert" price="11€" images="https://cdn.generationvoyage.fr/2020/10/kebab-cta-755x504.jpg" />
                    </div>
                </div>
                <div className="restaurant-page-container-product">
                    <div className="restaurant-page-container-product-title">
                        <div className="restaurant-page-container-product-title-text">Dessert</div>
                    </div>
                    <div className="restaurant-page-container-product-cards">
                        <Product_card_consumer name="Menu Plat + Boisson" price="10€" images="https://cdn.generationvoyage.fr/2020/10/kebab-cta-755x504.jpg" />
                        <Product_card_consumer name="Menu Plat + Dessert" price="11€" images="https://cdn.generationvoyage.fr/2020/10/kebab-cta-755x504.jpg" />
                    </div>
                </div>
                <div className="restaurant-page-container-product">
                    <div className="restaurant-page-container-product-title">
                        <div className="restaurant-page-container-product-title-text">Boisson</div>
                    </div>
                    <div className="restaurant-page-container-product-cards">
                        <Product_card_consumer name="Menu Plat + Boisson" price="10€" images="https://cdn.generationvoyage.fr/2020/10/kebab-cta-755x504.jpg" />
                        <Product_card_consumer name="Menu Plat + Dessert" price="11€" images="https://cdn.generationvoyage.fr/2020/10/kebab-cta-755x504.jpg" />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Restaurant_page;