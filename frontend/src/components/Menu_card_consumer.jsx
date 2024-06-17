import React from "react";
import "../styles/Menu_card_consumer.css";

const Menu_card_consumer = (props) => {

    return (
        <section className="card-section">
            <div className="card-item">
                <div className="card-item-overlay">
                    <div className="card-item-overlay-text">Ajouter au panier</div>
                    <div className="success-checkmark">
                        <div className="check-icon">
                            <span className="icon-line line-tip"></span>
                            <span className="icon-line line-long"></span>
                            <div className="icon-circle"></div>
                            <div className="icon-fix"></div>
                        </div>
                    </div>
                </div>
                <div className="cover-image">
                    <img src={props.image} />
                </div>
                <p className="item-name">{props.name}</p>
                <p className="item-price">{props.price} €</p>
            </div>
        </section>
    );
}
export default Menu_card_consumer;