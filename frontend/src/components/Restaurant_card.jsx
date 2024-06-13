import React from "react";
import "../styles/Restaurant_card.css";

const Restaurant_card = (props) => {
    return (
        <a className="restaurant-card">
            <img src={props.image} alt="restaurant" />
            <div className="restaurant-card-text">
                <div className="restaurant-card-text-title">{props.title}</div>
            </div>
        </a>
    );
}

export default Restaurant_card;