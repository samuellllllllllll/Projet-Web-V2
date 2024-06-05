import React from "react";
import "../styles/FoodCard.css";

const FoodCard = (props) => {
    return (
        <section className="card-section">
            <div className="card-item">
                <img src={props.images} alt="Coca Cola 33cl" />
                <p className="item-name">{props.text}</p>
                <p className="item-price">{props.text}</p>
            </div>
        </section>
    );
}
export default FoodCard;