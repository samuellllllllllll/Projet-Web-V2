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
    const [interfaceMenu, setInterfaceMenu] = useState(false);
    const [choosenMenu, setChoosenMenu] = useState([]);
    const [selectedNameProducts, setSelectedNameProducts] = useState({
        name_starter: '',
        name_main_dish: '',
        name_dessert: '',
        name_drink: '',
    });
    const [selectedIdProducts, setSelectedIdProducts] = useState({
        id_starter: null,
        id_main_dish: null,
        id_dessert: null,
        id_drink: null,
    });
    const [selectedStateProducts, setSelectedStateProducts] = useState({
        state_starter: false,
        state_main_dish: false,
        state_dessert: false,
        state_drink: false,
    });

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
                console.log(response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        getMenus();
        getProducts();
    }, [id]);

    const handleInterface = (menu_id) => {
        setInterfaceMenu(!interfaceMenu);
        setChoosenMenu(menu_id);

        // Reset selectedNameProducts, selectedIdProducts, selectedStateProducts
        setSelectedNameProducts({
            name_starter: '',
            name_main_dish: '',
            name_dessert: '',
            name_drink: '',
        });
        setSelectedIdProducts({
            id_starter: null,
            id_main_dish: null,
            id_dessert: null,
            id_drink: null,
        });
        setSelectedStateProducts({
            state_starter: false,
            state_main_dish: false,
            state_dessert: false,
            state_drink: false,
        });
    }

    // For a menu a can only choose one product per category
    // The product that I choose will have a border around it
    // When I click on a product, the border will be added or removed
    const toggleSelection = (product_id, category) => {
        if (category === 4) {
            if (selectedIdProducts.id_starter === product_id) {
                setSelectedNameProducts({...selectedNameProducts, name_starter: ''});
                setSelectedIdProducts({...selectedIdProducts, id_starter: null});
                setSelectedStateProducts({...selectedStateProducts, state_starter: false});
            } else {
                setSelectedNameProducts({...selectedNameProducts, name_starter: products.find(product => product.id === product_id).name});
                setSelectedIdProducts({...selectedIdProducts, id_starter: product_id});
                setSelectedStateProducts({...selectedStateProducts, state_starter: true});
            }
        }
        if (category === 1) {
            if (selectedIdProducts.id_main_dish === product_id) {
                setSelectedNameProducts({...selectedNameProducts, name_main_dish: ''});
                setSelectedIdProducts({...selectedIdProducts, id_main_dish: null});
                setSelectedStateProducts({...selectedStateProducts, state_main_dish: false});
            } else {
                setSelectedNameProducts({...selectedNameProducts, name_main_dish: products.find(product => product.id === product_id).name});
                setSelectedIdProducts({...selectedIdProducts, id_main_dish: product_id});
                setSelectedStateProducts({...selectedStateProducts, state_main_dish: true});
            }
        }
        if (category === 2) {
            if (selectedIdProducts.id_dessert === product_id) {
                setSelectedNameProducts({...selectedNameProducts, name_dessert: ''});
                setSelectedIdProducts({...selectedIdProducts, id_dessert: null});
                setSelectedStateProducts({...selectedStateProducts, state_dessert: false});
            } else {
                setSelectedNameProducts({...selectedNameProducts, name_dessert: products.find(product => product.id === product_id).name});
                setSelectedIdProducts({...selectedIdProducts, id_dessert: product_id});
                setSelectedStateProducts({...selectedStateProducts, state_dessert: true});
            }
        }
        if (category === 3) {
            if (selectedIdProducts.id_drink === product_id) {
                setSelectedNameProducts({...selectedNameProducts, name_drink: ''});
                setSelectedIdProducts({...selectedIdProducts, id_drink: null});
                setSelectedStateProducts({...selectedStateProducts, state_drink: false});
            } else {
                setSelectedNameProducts({...selectedNameProducts, name_drink: products.find(product => product.id === product_id).name});
                setSelectedIdProducts({...selectedIdProducts, id_drink: product_id});
                setSelectedStateProducts({...selectedStateProducts, state_drink: true});
            }
        }
    }

    const handleOrder = (menuId, menuName, starterState, main_dishState, dessertState, drinkState, price) => {
        const { id_starter, id_main_dish, id_dessert, id_drink } = selectedIdProducts;
        const { name_starter, name_main_dish, name_dessert, name_drink } = selectedNameProducts;
        const { state_starter, state_main_dish, state_dessert, state_drink } = selectedStateProducts;
        const alert = document.querySelector('.restaurant-page-container-menu-clicked-alert');
        if (state_starter === starterState &&  state_main_dish === main_dishState && state_dessert === dessertState && state_drink === drinkState) {

            // We add the menu with the choosen products in the local storage
            let menus = JSON.parse(localStorage.getItem('menus')) || [];
            menus.push({
                "menu_id": menuId,
                "name": menuName,
                "id_starter": id_starter,
                "id_main_dish": id_main_dish,
                "id_dessert": id_dessert,
                "id_drink": id_drink,
                "name_starter": name_starter,
                "name_main_dish": name_main_dish,
                "name_dessert": name_dessert,
                "name_drink": name_drink,
                "id_restaurant": id,
                "name_restaurant": name,
                "image": image,
                "price": price,
                "id_menu_panier": menuId + id + id_starter + id_main_dish + id_dessert + id_drink
            });
            localStorage.setItem('menus', JSON.stringify(menus));

            // We update the local storage
            const event = new Event('updateOrder');
            window.dispatchEvent(event);
            handleInterface()

        } else {
            alert.innerHTML = 'Veuillez choisir un produit par catégorie';
            setTimeout(() => {
                alert.innerHTML = '';
            }, 3000);
        }
    }

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
                {interfaceMenu === false ? (
                    <>
                        <div className="restaurant-page-container-product">
                            <div className="restaurant-page-container-product-title">
                                <div className="restaurant-page-container-product-title-text">Menu</div>
                            </div>
                            <div className="restaurant-page-container-product-cards">
                                {menus.map((menu) => (
                                    <div className="restaurant-page-container-product-card" key={menu.id} onClick={ () => handleInterface(menu.id) }>
                                        <Menu_card_consumer key={menu.id} id={menu.id} name={menu.name} price={menu.price} image={image} restaurant_id={id} restaurant_name={name}/>
                                    </div>
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
                                {products.filter(product => product.category === 4).length === 0 ? <div className="restaurant-page-container-product-cards-empty">Ce restaurant n'a pas d'entrée</div> : products.filter(product => product.category === 4).map((product) => (
                                    <div className="restaurant-page-container-product-card" key={product.id}>
                                        <Product_card_consumer key={product.id} id={product.id} name={product.name} price={product.price} image={product.url_picture} restaurant_id={id} restaurant_name={name} />
                                    </div>
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
                                    <Product_card_consumer key={product.id} id={product.id} name={product.name} price={product.price} image={product.url_picture} restaurant_id={id} restaurant_name={name} className="restaurant-page-container-product-card" />
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
                                    <Product_card_consumer key={product.id} id={product.id} name={product.name} price={product.price} image={product.url_picture} restaurant_id={id} restaurant_name={name} className="restaurant-page-container-product-card" />
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
                                    <Product_card_consumer key={product.id} id={product.id} name={product.name} price={product.price} image={product.url_picture} restaurant_id={id} restaurant_name={name} className="restaurant-page-container-product-card" />
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="restaurant-page-container-menu-clicked">
                        <div className="restaurant-page-container-menu-clicked-top">
                            <div className="restaurant-page-container-menu-clicked-arrow">
                                <i className="uil uil-arrow-left" onClick={ () => handleInterface() }></i>
                            </div>
                            <div className="restaurant-page-container-menu-clicked-title">{menus.find(menu => menu.id === choosenMenu).name}</div>
                        </div>
                        <div className="restaurant-page-container-menu-clicked-products">
                            {menus.find(menu => menu.id === choosenMenu).starter === true ? (
                                <div className="restaurant-page-container-menu-clicked-product">
                                    <div className="restaurant-page-container-menu-clicked-product-title">Choisissez une entrée</div>
                                    <div className="restaurant-page-container-menu-clicked-product-cards">
                                        {products.filter(product => product.category === 0).map((product) => (
                                            <div className="restaurant-page-container-menu-clicked-product-card" key={product.id} 
                                            onClick={ () => toggleSelection(product.id, 0) } 
                                            style={selectedIdProducts.id_starter === product.id ? {border: "5px solid #FF7B00"} : {border: "5px solid #FFFFFF"}}>
                                                <img src={product.url_picture} alt="Produit" />
                                                <div className="restaurant-page-container-menu-clicked-product-card-name">{product.name}</div>
                                                <div className="restaurant-page-container-menu-clicked-product-card-overlay">Choisir</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )}
                            {menus.find(menu => menu.id === choosenMenu).main_dish === true ? (
                                <div className="restaurant-page-container-menu-clicked-product">
                                    <div className="restaurant-page-container-menu-clicked-product-title">Choisissez un plat</div>
                                    <div className="restaurant-page-container-menu-clicked-product-cards">
                                        {products.filter(product => product.category === 1).map((product) => (
                                            <div className="restaurant-page-container-menu-clicked-product-card" key={product.id} 
                                            onClick={ () => toggleSelection(product.id, 1) } 
                                            style={selectedIdProducts.id_main_dish === product.id ? {border: "5px solid #FF7B00"} : {border: "5px solid #FFFFFF"}}>
                                                <img src={product.url_picture} alt="Produit" />
                                                <div className="restaurant-page-container-menu-clicked-product-card-name">{product.name}</div>
                                                <div className="restaurant-page-container-menu-clicked-product-card-overlay">Choisir</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )}
                            {menus.find(menu => menu.id === choosenMenu).dessert === true ? (
                                <div className="restaurant-page-container-menu-clicked-product">
                                    <div className="restaurant-page-container-menu-clicked-product-title">Choisissez un dessert</div>
                                    <div className="restaurant-page-container-menu-clicked-product-cards">
                                        {products.filter(product => product.category === 2).map((product) => (
                                            <div className="restaurant-page-container-menu-clicked-product-card" key={product.id} 
                                            onClick={ () => toggleSelection(product.id, 2) } 
                                            style={selectedIdProducts.id_dessert === product.id ? {border: "5px solid #FF7B00"} : {border: "5px solid #FFFFFF"}}>
                                                <img src={product.url_picture} alt="Produit" />
                                                <div className="restaurant-page-container-menu-clicked-product-card-name">{product.name}</div>
                                                <div className="restaurant-page-container-menu-clicked-product-card-overlay">Choisir</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )}
                            {menus.find(menu => menu.id === choosenMenu).drink === true ? (
                                <div className="restaurant-page-container-menu-clicked-product">
                                    <div className="restaurant-page-container-menu-clicked-product-title">Choisissez une boisson</div>
                                    <div className="restaurant-page-container-menu-clicked-product-cards">
                                        {products.filter(product => product.category === 3).map((product) => (
                                            <div className="restaurant-page-container-menu-clicked-product-card" key={product.id} 
                                            onClick={ () => toggleSelection(product.id, 3) } 
                                            style={selectedIdProducts.id_drink === product.id ? {border: "5px solid #FF7B00"} : {border: "5px solid #FFFFFF"}}>
                                                <img src={product.url_picture} alt="Produit" />
                                                <div className="restaurant-page-container-menu-clicked-product-card-name">{product.name}</div>
                                                <div className="restaurant-page-container-menu-clicked-product-card-overlay">Choisir</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )}
                            <div className="restaurant-page-container-menu-clicked-bottom">
                                <div className="restaurant-page-container-menu-clicked-alert"></div>
                                <button className="restaurant-page-container-menu-clicked-button" 
                                onClick={ () => handleOrder(
                                    menus.find(menu => menu.id === choosenMenu).id,
                                    menus.find(menu => menu.id === choosenMenu).name,
                                    menus.find(menu => menu.id === choosenMenu).starter, 
                                    menus.find(menu => menu.id === choosenMenu).main_dish, 
                                    menus.find(menu => menu.id === choosenMenu).dessert, 
                                    menus.find(menu => menu.id === choosenMenu).drink,
                                    menus.find(menu => menu.id === choosenMenu).price,
                                    )}>Ajouter au panier</button>
                            </div>
                        </div>
                    </div>
                )}
                <Footer />
            </div>
        </div>
    );
}

export default Restaurant_page;