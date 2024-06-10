import React from "react";
import "../styles/Product_card_consumer.css";

const Product_card_consumer = (props) => {

    const checkmark = (id) => {
        console.log(id);
        document.querySelector(`#overlay-${id}`).style.opacity = '1';
        document.querySelector(`#text-${id}`).style.display = 'none';
        document.querySelector(`#checkmark-${id}`).style.display = 'block';
        setTimeout(() => {
            document.querySelector(`#overlay-${id}`).style.opacity = '0';
        }, 2000);
        setTimeout(() => {
            document.querySelector(`#text-${id}`).style.display = 'block';
            document.querySelector(`#checkmark-${id}`).style.display = 'none';
        }, 2500);
    }

    return (
        <section className="card-section">
            <div className="card-item" onClick={() => checkmark(props.id)}>
                <div className="card-item-overlay" id={`overlay-${props.id}`}>
                    <div className="card-item-overlay-text" id={`text-${props.id}`}>Ajouter au panier</div>
                    <div class="success-checkmark" id={`checkmark-${props.id}`}>
                        <div class="check-icon">
                            <span class="icon-line line-tip"></span>
                            <span class="icon-line line-long"></span>
                            <div class="icon-circle"></div>
                            <div class="icon-fix"></div>
                        </div>
                    </div>
                </div>
                <img src={props.images} />
                <p className="item-name">{props.name}</p>
                <p className="item-price">{props.price}</p>
            </div>
        </section>
    );
}
export default Product_card_consumer;