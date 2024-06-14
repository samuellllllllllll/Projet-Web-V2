import React from "react";
import "../styles/Restaurant_card.css";
import { useNavigate } from "react-router-dom";

const Restaurant_card = (props) => {
    const navigate = useNavigate();

    return (
        <div className="restaurant-card" onClick={() => navigate("/consommateur/page_restaurant", { state: { id: props.id, name: props.title, image: props.image } })}>
            <img src={props.image} alt="restaurant" />
            <div className="restaurant-card-text">
                <div className="restaurant-card-text-title">{props.title}</div>
            </div>
        </div>
    );
}

export default Restaurant_card;