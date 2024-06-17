import React from "react";
import "../styles/Product_card_consumer.css";

const Product_card_consumer = (props) => {

    const checkmark = (id) => {
        console.log(id);
        document.querySelector(`#product-overlay-${id}`).style.opacity = '1';
        document.querySelector(`#product-text-${id}`).style.display = 'none';
        document.querySelector(`#product-checkmark-${id}`).style.display = 'block';
        setTimeout(() => {
            document.querySelector(`#product-overlay-${id}`).style.opacity = '0';
        }, 2000);
        setTimeout(() => {
            document.querySelector(`#product-text-${id}`).style.display = 'block';
            document.querySelector(`#product-checkmark-${id}`).style.display = 'none';
        }, 2500);
    }

    return (
        <section className="card-section">
            <div className="card-item" onClick={() => checkmark(props.id)}>
                <div className="card-item-overlay" id={`product-overlay-${props.id}`}>
                    <div className="card-item-overlay-text" id={`product-text-${props.id}`}>Ajouter au panier</div>
                    <div className="success-checkmark" id={`product-checkmark-${props.id}`}>
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
export default Product_card_consumer;