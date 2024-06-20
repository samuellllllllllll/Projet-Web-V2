import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/restaurant/menuEdit.css';
import FoodCard from '../../components/FoodCard';
import MobileHeader2 from '../../components/MobileHeader2.jsx';
import AladinMenu from '../../assets/aladin.jpg';  // Importer l'image

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

    const fetchArticles = async () => {
        try {
            const responsePlats = await axios.get('http://localhost:4548/articles/restaurants/menu/1');
            const responseBoissons = await axios.get('http://localhost:4548/articles/restaurants/menu/3');
            const responseDesserts = await axios.get('http://localhost:4548/articles/restaurants/menu/2');
            const responseMenus = await axios.get('http://localhost:4546/restaurants/menus', {
                params: {
                    id_user: 2,
                }
            });
            setPlats(responsePlats.data.rows);
            setBoissons(responseBoissons.data.rows);
            setDesserts(responseDesserts.data.rows);
            setMenus(responseMenus.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const deleteArticles = async (articleId) => {
        try {
            await axios.delete(`http://localhost:4548/articles/restaurants/menu/${articleId}`);
            fetchArticles();
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    };

    const renderFoodCards = (category, items, isMenu = false) => {
        return Array.isArray(items) && items.map(item => (
            <FoodCard
                key={item.id}
                id={item.id}
                images={isMenu ? AladinMenu : item.url_picture}  // Utiliser l'image AladinMenu pour les menus
                name={item.name}
                price={`${item.price}€`}
                isEditing={isEditing}
                onDelete={() => deleteArticles(item.id)}
                onEdit={isEditing ? () => openEditModal(item) : undefined}
            />
        ));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFood((prevFood) => ({
            ...prevFood,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedFood) {
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
        setSelectedFood(null); // Assurez-vous que selectedFood est null lors de l'ajout
        setNewFood({ images: '', name: '', price: '', category }); // Réinitialisation complète de newFood
        setShowModal(true);
        setIsModalOpen(true);
    };

    const openEditModal = (food) => {
        setSelectedFood(food);
        setNewFood({
            images: food.url_picture,
            name: food.name,
            price: food.price,
            category: food.category
        });
        setShowModal(true);
        setIsModalOpen(true);
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        setSelectedFood(null);
    };

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
                {renderFoodCards("2", boissons)}
            </section>
            <div className="section-header">
                <h2 className="section-title">Plats</h2>
                {isEditing && <button className="add-button" onClick={() => handleAddFood("1")}>+</button>}
            </div>
            <section className="card-row">
                {renderFoodCards("1", plats)}
            </section>
            <div className="section-header">
                <h2 className="section-title">Desserts</h2>
                {isEditing && <button className="add-button" onClick={() => handleAddFood("2")}>+</button>}
            </div>
            <section className="card-row">
                {renderFoodCards("3", desserts)}
            </section>
            <div className="section-header">
                <h2 className="section-title">Menus</h2>
                {isEditing && <button className="add-button" onClick={() => handleAddFood("4")}>+</button>}
            </div>
            <section className="card-row">
                {renderFoodCards("4", menus, true)}  // Passer "true" pour indiquer que c'est un menu
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
                                <input type="text" name="images" value={newFood.images} onChange={handleInputChange} />
                            </label>
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