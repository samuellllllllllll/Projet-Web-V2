import React from "react";
import "../styles/Product_card_consumer.css";

const Product_card_consumer = (props) => {

    // If the user click on the card that mean he want to order the product
    const orderProduct = (id) => {

        // We display a checkmark animation
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

        // We add the product in the local storage
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(props);
        localStorage.setItem('products', JSON.stringify(products));

        // We update the local storage
        const event = new Event('updateOrder');
        window.dispatchEvent(event);
        console.log(props)
    }

    return (
        <section className="card-section">
            <div className="card-item" onClick={() => orderProduct(props.id)}>
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
                <p className="item-price">{props.price} €</p>
            </div>
        </section>
    );
}
export default Product_card_consumer;