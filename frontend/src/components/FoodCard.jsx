import React from "react";
import "../styles/FoodCard.css";

const FoodCard = (props) => {
    return (
        <section className="card-section">
            <div className="card-item">
                <img src={props.images} />
                <p className="item-name">{props.name}</p>
                <p className="item-price">{props.price}</p>
            </div>
        </section>
    );
}
export default FoodCard;