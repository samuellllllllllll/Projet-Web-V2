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

    return (
        <div className="menu-page">
            <MobileHeader2 />
            <nav className="menu-nav">
                <h1 className="menu-title">Menu</h1>
                <button className="edit-button" onClick={toggleEditMode}>Modifier</button>
            </nav>
            <h2 className="section-title">Boissons</h2>
            <section className="card-row">
                {renderFoodCards("Boissons")}
            </section>
            <h2 className="section-title">Plats</h2>
            <section className="card-row">
                {renderFoodCards("Plats")}
            </section>
        </div>
    );
};

export default MenuEdit;