import React from "react";
import "../styles/Menu_card_consumer.css";

const Menu_card_consumer = (props) => {

    const checkmark = (id) => {
        console.log(id);
        document.querySelector(`#menu-overlay-${id}`).style.opacity = '1';
        document.querySelector(`#menu-text-${id}`).style.display = 'none';
        document.querySelector(`#menu-checkmark-${id}`).style.display = 'block';
        setTimeout(() => {
            document.querySelector(`#menu-overlay-${id}`).style.opacity = '0';
        }, 2000);
        setTimeout(() => {
            document.querySelector(`#menu-text-${id}`).style.display = 'block';
            document.querySelector(`#menu-checkmark-${id}`).style.display = 'none';
        }, 2500);
    }

    return (
        <section className="card-section">
            <div className="card-item" onClick={() => checkmark(props.id)}>
                <div className="card-item-overlay" id={`menu-overlay-${props.id}`}>
                    <div className="card-item-overlay-text" id={`menu-text-${props.id}`}>Ajouter au panier</div>
                    <div className="success-checkmark" id={`menu-checkmark-${props.id}`}>
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
                <p className="item-price">{props.price}</p>
            </div>
        </section>
    );
}
export default Menu_card_consumer;