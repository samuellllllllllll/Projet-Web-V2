import React, { useState } from 'react';
import '../../styles/restaurant/menuEdit.css';
import coca from '../../assets/coca.jpg';
import fanta from '../../assets/fanta.jpg';
import tacos from '../../assets/tacos.jpg';
import kebab from '../../assets/Kebab.jpeg';
import FoodCard from '../../components/FoodCard';
import MobileHeader2 from '../../components/MobileHeader2.jsx';

const MenuEdit = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [foods, setFoods] = useState([
        { id: 1, images: coca, name: "Coca Cola", price: "1€", category: "Boissons" },
        { id: 2, images: fanta, name: "Fanta", price: "1€", category: "Boissons" },
        { id: 3, images: kebab, name: "Kebab", price: "8€", category: "Plats" },
        { id: 4, images: tacos, name: "Tacos", price: "8€", category: "Plats" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newFood, setNewFood] = useState({ images: '', name: '', price: '', category: '' });

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const removeFoodCard = (id) => {
        setFoods(foods.filter(food => food.id !== id));
    };

    const renderFoodCards = (category) => {
        return foods.filter(food => food.category === category).map(food => (
            <FoodCard
                key={food.id}
                id={food.id}
                images={food.images}
                name={food.name}
                price={food.price}
                isEditing={isEditing}
                onDelete={removeFoodCard}
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
        setFoods([...foods, { ...newFood, id: foods.length + 1 }]);
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
                {isEditing && <button className="add-button" onClick={() => handleAddFood("Boissons")}>+</button>}
            </div>
            <section className="card-row">
                {renderFoodCards("Boissons")}
            </section>
            <div className="section-header">
                <h2 className="section-title">Plats</h2>
                {isEditing && <button className="add-button" onClick={() => handleAddFood("Plats")}>+</button>}
            </div>
            <section className="card-row">
                {renderFoodCards("Plats")}
            </section>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Ajouter un nouveau plat</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Nom :
                                <input type="text" name="name" value={newFood.name} onChange={handleInputChange} />
                            </label>
                            <label>
                                Prix :
                                <input type="text" name="price" value={newFood.price} onChange={handleInputChange} />
                            </label>
                            <label>
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