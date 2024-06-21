import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/restaurant/menuEdit.css';
import FoodCard from '../../components/FoodCard';
import MobileHeader2 from '../../components/MobileHeader2.jsx';
import AladinMenu from '../../assets/aladin.jpg';

const MenuEdit = () => {
    const [plats, setPlats] = useState([]);
    const [boissons, setBoissons] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newFood, setNewFood] = useState({ images: '', name: '', price: '', category: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);
    const [addCategory, setAddCategory] = useState(null);
    const [menus, setMenus] = useState([]);
    const [entrées, setEntrées] = useState([]);
    const [hasStarter, setHasStarter] = useState(false);
    const [hasMainDish, setHasMainDish] = useState(false);
    const [hasDessert, setHasDessert] = useState(false);
    const [hasDrink, setHasDrink] = useState(false);
    const [isMenu, setIsMenu] = useState(false);

    const fetchArticles = async () => {
        try {
            const responsePlats = await axios.get('http://localhost:4548/articles/restaurants/menu/1');
            const responseBoissons = await axios.get('http://localhost:4548/articles/restaurants/menu/3');
            const responseDesserts = await axios.get('http://localhost:4548/articles/restaurants/menu/2');
            const responseEntrees = await axios.get('http://localhost:4548/articles/restaurants/menu/4');
            const responseMenus = await axios.get('http://localhost:4546/restaurants/menus', {
                params: {
                    id_user: 2,
                }
            });
            setPlats(responsePlats.data.rows);
            setBoissons(responseBoissons.data.rows);
            setDesserts(responseDesserts.data.rows);
            setEntrées(responseEntrees.data.rows);
            setMenus(responseMenus.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    useEffect(() => {
        setIsMenu(addCategory === "menus");
    }, [addCategory]);

    const deleteArticles = async (articleId, category) => {
        try {
            if (category === "menus") {
                await axios.delete(`http://localhost:4546/restaurants/menus/${articleId}`);
            } else {
                await axios.delete(`http://localhost:4548/articles/restaurants/menu/${articleId}`);
            }
            fetchArticles();
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    };

    const renderFoodCards = (category, items) => {
        if (items.length === 0) {
            return <p className='yapa'>Il n'y a pas de {category}</p>;
        }
        return Array.isArray(items) && items.map(item => (
            <FoodCard
                key={item.id}
                id={item.id}
                images={item.url_picture}
                name={item.name}
                price={`${item.price}€`}
                isEditing={isEditing}
                onDelete={() => deleteArticles(item.id, category)}
                onEdit={isEditing ? () => openEditModal(item) : undefined}
            />
        ));
    };

    const renderMenuCards = (category, items) => {
        if (items.length === 0) {
            return <p className='yapa'>Il n'y a pas de {category}</p>;
        }
        return Array.isArray(items) && items.map(item => (
            <FoodCard
                key={item.id}
                id={item.id}
                images={AladinMenu}
                name={item.name}
                price={`${item.price}€`}
                isEditing={isEditing}
                onDelete={() => deleteArticles(item.id, category)}
                onEdit={isEditing ? () => openEditModalMenu(item) : undefined}
            />
        ));
    };
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            switch (name) {
                case 'starter':
                    setHasStarter(checked);
                    break;
                case 'main_dish':
                    setHasMainDish(checked);
                    break;
                case 'dessert':
                    setHasDessert(checked);
                    break;
                case 'drink':
                    setHasDrink(checked);
                    break;
                default:
                    break;
            }
        } else {
            setNewFood((prevFood) => ({
                ...prevFood,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedFood) {
                if (selectedFood?.category === "menus") {
                    const response = await axios.put(`http://localhost:4546/restaurants/menus/modify/${newFood.name}/${newFood.price}/${hasStarter}/${hasMainDish}/${hasDessert}/${hasDrink}/${selectedFood.id}`);
                    console.log('Response from server:', response.data);
                } else {
                    // Modification d'un article existant
                    const response = await axios.put(`http://localhost:4548/articles/restaurants/menu/modify`, {
                        params: {
                            name: newFood.name,
                            price: newFood.price,
                            url_picture: newFood.images,
                            category: newFood.category,
                            id: selectedFood.id
                        }
                    });
                    console.log('Response from server:', response.data);
                }
            } else {
                if (addCategory === "menus") {
                    const response = await axios.post(`http://localhost:4546/restaurants/menus/${newFood.name}/${newFood.price}/${hasStarter}/${hasMainDish}/${hasDessert}/${hasDrink}/2`);
                } else {
                    // Ajout d'un nouvel article
                    console.log(addCategory);
                    const response = await axios.post('http://localhost:4548/articles', {
                        params: {
                            name: newFood.name,
                            price: newFood.price,
                            url_picture: newFood.images,
                            category: addCategory,
                            user_id: 2,
                            availability: true
                        }
                    });
                    console.log('Response from server:', response.data);
                }
            }

            // Mise à jour locale des articles après modification ou ajout
            await fetchArticles();

            // Réinitialisation des états et fermeture du modal
            setShowModal(false);
            setIsModalOpen(false);
            setSelectedFood(null); // Réinitialiser selectedFood après chaque opération

            // Réinitialisation de newFood pour vider les champs du formulaire
            setNewFood({ images: '', name: '', price: '', category: '' });

        } catch (error) {
            console.error('Error updating/adding article:', error);
        }
    };

    const handleAddFood = (category) => {
        setAddCategory(category);
        setSelectedFood(null);
        setNewFood({ images: '', name: '', price: '', category });
        setShowModal(true);
        setIsModalOpen(true);
    };

    const openEditModalMenu = (food) => {
        console.log(food);
        setSelectedFood(food);
        setNewFood({
            images: food.url_picture,
            name: food.name,
            price: food.price,
            category: food.category
        });

        setHasStarter(food.starter || false);
        setHasMainDish(food.main_dish || false);
        setHasDessert(food.dessert || false);
        setHasDrink(food.drink || false);

        setShowModal(true);
        setIsModalOpen(true);
        setIsMenu(true);
    };

    const openEditModal = (food) => {
        setSelectedFood(food);
        setNewFood({
            images: food.url_picture,
            name: food.name,
            price: food.price,
            category: food.category
        });

        if (food.category === 'menus') {
            setHasStarter(true);
            setHasMainDish(true);
            setHasDessert(true);
            setHasDrink(true);
            setIsMenu(true);
        } else {
            setHasStarter(false);
            setHasMainDish(false);
            setHasDessert(false);
            setHasDrink(false);
            setIsMenu(false);
        }
        setShowModal(true);
        setIsModalOpen(true);
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        setSelectedFood(null);
    };

    const isMenuEditTrue = () => {
        setIsMenu(true);
    }

    const isMenuEditFalse = () => {
        setIsMenu(false);
    }

    return (
        <div className="menu-page">
            <MobileHeader2 className={`header-black ${isModalOpen ? 'modal-open' : ''}`} />
            <nav className="menu-nav">
                <h1 className="menu-title">Menu</h1>
                <button className="edit-button" onClick={toggleEditMode}>Modifier</button>
            </nav>
            <div className="section-header">
                <h2 className="section-title">Boissons</h2>
                {isEditing && <button className="add-button" onClick={() => handleAddFood("3")}>+</button>}
            </div>
            <section className="card-row">
                {renderFoodCards("boissons", boissons, false)}
            </section>
            <div className="section-header">
                <h2 className="section-title">Entrées</h2>
                {isEditing && <button className="add-button" onClick={() => handleAddFood("4")}>+</button>}
            </div>
            <section className="card-row">
                {renderFoodCards("entrées", entrées)}
            </section>
            <div className="section-header">
                <h2 className="section-title">Plats</h2>
                {isEditing && <button className="add-button" onClick={() => handleAddFood("1")}>+</button>}
            </div>
            <section className="card-row">
                {renderFoodCards("plats", plats)}
            </section>
            <div className="section-header">
                <h2 className="section-title">Desserts</h2>
                {isEditing && <button className="add-button" onClick={() => handleAddFood("2")}>+</button>}
            </div>
            <section className="card-row">
                {renderFoodCards("desserts", desserts)}
            </section>
            <div className="section-header">
                <h2 className="section-title">Menus</h2>
                {isEditing && <button className="add-button" onClick={() => handleAddFood("menus")}>+</button>}
            </div>
            <section className="card-row">
                {renderMenuCards("menus", menus)}
            </section>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{selectedFood ? 'Modifier un article' : 'Ajouter un nouvel article'}</h2>
                        <form onSubmit={handleSubmit}>
                            <label className="form-label">
                                Nom :
                                <input type="text" name="name" value={newFood.name} onChange={handleInputChange} />
                            </label>
                            <label className="form-label">
                                Prix :
                                <input type="text" name="price" value={newFood.price} onChange={handleInputChange} />
                            </label>
                            <label className="form-label">
                                Image URL :
                                {!isMenu && (
                                    <input type="text" name="images" value={newFood.images} onChange={handleInputChange} />
                                )}
                            </label>
                            {isMenu && (
                                <>
                                    <label className="form-label checkbox-label">
                                        Entrées :
                                        <input type="checkbox" name="starter" checked={hasStarter} onChange={handleInputChange} className="checkbox-input" />
                                    </label>
                                    <label className="form-label checkbox-label">
                                        Plats :
                                        <input type="checkbox" name="main_dish" checked={hasMainDish} onChange={handleInputChange} className="checkbox-input" />
                                    </label>
                                    <label className="form-label checkbox-label">
                                        Desserts :
                                        <input type="checkbox" name="dessert" checked={hasDessert} onChange={handleInputChange} className="checkbox-input" />
                                    </label>
                                    <label className="form-label checkbox-label">
                                        Boissons :
                                        <input type="checkbox" name="drink" checked={hasDrink} onChange={handleInputChange} className="checkbox-input" />
                                    </label>
                                </>
                            )}
                            <button type="submit">{selectedFood ? 'Modifier' : 'Ajouter'}</button>
                            <button type="button" onClick={() => setShowModal(false)}>Annuler</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuEdit;