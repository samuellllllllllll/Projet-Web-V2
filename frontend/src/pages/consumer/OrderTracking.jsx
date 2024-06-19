import React, { useState, useEffect } from "react";
import "../../styles/consumer/OrderTracking.css";
import axios from 'axios';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const OrderTracking = () => {

    const [order, setOrder] = useState([]);
    
    const getOrder = async () => {
        try {
            const response = await axios.get('http://localhost:4545/orders/:id', {
                params: {
                    consumer_id: 1, // TO BE CHANGED
                }
            });
            setOrder(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const convertDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');
        const hours = (date.getUTCHours() + 2).toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return formattedDate;
    }

    const intervalId = setInterval(getOrder, 15000); // Fetch orders every 15 seconds

    useEffect(() => {
        getOrder();
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return(
        <div className="order-tracking">
            <Header />
            <div className="order-tracking-container">
                <div className="order-tracking-container-title">Suivi commandes</div>
                <div className="order-tracking-container-content">
                    {order.map((order) => (
                        <div key={order._id} className="order-tracking-container-content-items">
                            <div className="order-tracking-container-content-item-top">
                                {/* If status=-1 <=> order refused by restaurant */}
                                {order.status === -1 && (
                                    <div className="order-tracking-container-content-item-top-cases">
                                        <div className="order-tracking-container-content-item-top-case" id="refused"></div>
                                        <div className="order-tracking-container-content-item-top-case" id="refused"></div>
                                        <div className="order-tracking-container-content-item-top-case" id="refused"></div>
                                    </div>
                                )}
                                {/* If status=0 <=> basket validated */}
                                {order.status === 0 && (
                                    <div className="order-tracking-container-content-item-top-cases">
                                        <div className="order-tracking-container-content-item-top-case" id="in-progress"></div>
                                        <div className="order-tracking-container-content-item-top-case" id="to-do"></div>
                                        <div className="order-tracking-container-content-item-top-case" id="to-do"></div>
                                    </div>
                                )}
                                {/* If status=1 <=> order validated by restaurant */}
                                {order.status === 1 && (
                                    <div className="order-tracking-container-content-item-top-cases">
                                        <div className="order-tracking-container-content-item-top-case" id="done"></div>
                                        <div className="order-tracking-container-content-item-top-case" id="in-progress"></div>
                                        <div className="order-tracking-container-content-item-top-case" id="to-do"></div>
                                    </div>
                                )}
                                {/* If status=2 <=>  delivery in progress */}
                                {order.status === 2 && (
                                    <div className="order-tracking-container-content-item-top-cases">
                                        <div className="order-tracking-container-content-item-top-case" id="done"></div>
                                        <div className="order-tracking-container-content-item-top-case" id="done"></div>
                                        <div className="order-tracking-container-content-item-top-case" id="in-progress"></div>
                                    </div>
                                )}
                                {/* If status=3 <=> order delivered */}
                                {order.status === 3 && (
                                    <div className="order-tracking-container-content-item-top-cases">
                                        <div className="order-tracking-container-content-item-top-case" id="done"></div>
                                        <div className="order-tracking-container-content-item-top-case" id="done"></div>
                                        <div className="order-tracking-container-content-item-top-case" id="done"></div>
                                    </div>
                                )}
                                <div className="order-tracking-container-content-item-top-states">
                                    {/* If status=-1 <=> order refused by restaurant */}
                                    {order.status === -1 && (
                                        <div className="order-tracking-container-content-item-top-state">Commande refusée par le restaurant</div>
                                    )}
                                    {/* If status=0 <=> basket validated */}
                                    {order.status === 0 && (
                                        <div className="order-tracking-container-content-item-top-state">En attente de confirmation de la part du restaurant</div>
                                    )}
                                    {/* If status=1 <=> order validated by restaurant */}
                                    {order.status === 1 && (
                                        <div className="order-tracking-container-content-item-top-state">En cours de préparation</div>
                                    )}
                                    {/* If status=2 <=>  delivery in progress */}
                                    {order.status === 2 && (
                                        <div className="order-tracking-container-content-item-top-state">En cours de livraison</div>
                                    )}
                                    {/* If status=3 <=> order delivered */}
                                    {order.status === 3 && (
                                        <div className="order-tracking-container-content-item-top-state">Commande livrée</div>
                                    )}
                                </div>
                            </div>
                            <div className="order-tracking-container-content-item-bottom">
                                <div className="order-tracking-container-content-item-bottom-title">Commande #{order._id}</div>
                                <div className="order-tracking-container-content-item-bottom-info">{order.restaurant_name}</div>
                                <div className="order-tracking-container-content-item-bottom-info">{convertDate(order.date_and_time)}</div>
                                <div className="order-tracking-container-content-item-bottom-info">{order.price} €</div>
                                <div className="order-tracking-container-content-item-bottom-info" id="validation-code">Code de validation à remettre au livreur : <b>{order.validation_code}</b></div>
                            </div>
                        </div>
                    ))}
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default OrderTracking;