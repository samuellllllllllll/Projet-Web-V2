import React from "react";
import DeleteIcon from '../assets/moins.png';
import "../styles/FoodCard.css";

const FoodCard = ({ id, images, name, price, isEditing, onDelete, onEdit }) => {
    const handleEditClick = () => {
        if (onEdit) {
            onEdit();
        }
    };

    return (
        <section className="card-section">
            <div className="card-item">
                {isEditing && (
                    <img
                        src={DeleteIcon}
                        alt="Delete"
                        className="delete-icon-restaurant"
                        onClick={() => onDelete(id)}
                    />
                )}
                <img src={images} alt={name} className="food-image" onClick={handleEditClick} />
                <p className="item-name" onClick={handleEditClick}>{name}</p>
                <p className="item-price">{price}</p>
            </div>
        </section>
    );
};

export default FoodCard;