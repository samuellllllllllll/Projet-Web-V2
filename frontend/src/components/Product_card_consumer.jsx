import React from "react";
import "../styles/Product_card_consumer.css";

const Product_card_consumer = (props) => {
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
export default Product_card_consumer;