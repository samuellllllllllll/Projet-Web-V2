import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/restaurant/menuEdit.css';
import FoodCard from '../../components/FoodCard';
import MobileHeader2 from '../../components/MobileHeader2.jsx';

const MenuEdit = () => {
    const [plats, setPlats] = useState([]);
    const [boissons, setBoissons] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newFood, setNewFood] = useState({ images: '', name: '', price: '', category: '' });

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const responsePlats = await axios.get('http://localhost:4548/articles/restaurants/menu/1');
                const responseBoissons = await axios.get('http://localhost:4548/articles/restaurants/menu/3');
                const responseDesserts = await axios.get('http://localhost:4548/articles/restaurants/menu/2');

                setPlats(responsePlats.data.rows);
                setBoissons(responseBoissons.data.rows);
                setDesserts(responseDesserts.data.rows);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const removeFoodCard = (category, id) => {
        if (category === '1') {
            setPlats(plats.filter(plat => plat.id !== id));
        } else if (category === '2') {
            setBoissons(boissons.filter(boisson => boisson.id !== id));
        } else if (category === '3') {
            setDesserts(desserts.filter(dessert => dessert.id !== id));
        }
    };

    const renderFoodCards = (category, items) => {
        return Array.isArray(items) && items.map(item => (
            <FoodCard
                key={item.id}
                id={item.id}
                images={item.url_picture}
                name={item.name}
                price={`${item.price}€`}
                isEditing={isEditing}
                onDelete={() => removeFoodCard(category, item.id)}
            />
        ));
    };

    const handleAddFood = (category) => {
        setNewFood({ ...newFood, category });
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFood({ ...newFood, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newFood.category === '1') {
            setPlats([...plats, { ...newFood, id: plats.length + 1 }]);
        } else if (newFood.category === '2') {
            setBoissons([...boissons, { ...newFood, id: boissons.length + 1 }]);
        } else if (newFood.category === '3') {
            setDesserts([...desserts, { ...newFood, id: desserts.length + 1 }]);
        }
        setShowModal(false);
    };

    return (
        <div className="menu-page">
            <MobileHeader2 />
            <nav className="menu-nav">
                <h1 className="menu-title">Menu</h1>
                <button className="edit-button" onClick={toggleEditMode}>Modifier</button>
            </nav>
            <div className="section-header">
                <h2 className="section-title">Boissons</h2>
                {isEditing && <button className="add-button" onClick={() => handleAddFood("2")}>+</button>}
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
                {isEditing && <button className="add-button" onClick={() => handleAddFood("3")}>+</button>}
            </div>
            <section className="card-row">
                {renderFoodCards("3", desserts)}
            </section>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Ajouter un nouvel article</h2>
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
                            <button type="submit">Ajouter</button>
                            <button type="button" onClick={() => setShowModal(false)}>Annuler</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuEdit;