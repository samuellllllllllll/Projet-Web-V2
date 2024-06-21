import React, { useState, useEffect } from "react";
import "../../styles/consumer/OrderTracking.css";
import axios from 'axios';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const OrderTracking = () => {

    const [order, setOrder] = useState([]);
    
    const getOrder = async () => {
        try {
            const consumer_id = 1;
            const response = await axios.get(`http://localhost:4545/orders/consumers/${consumer_id}`);
            
            // Sort orders by date in descending order
            response.data.sort((a, b) => new Date(b.date_and_time) - new Date(a.date_and_time));
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

    // Refresh orders every 10 seconds
    useEffect(() => {
        getOrder();
        const interval = setInterval(() => {
            getOrder();
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return(
        <div className="order-tracking">
            <Header />
            <div className="order-tracking-container">
                <div className="order-tracking-container-title">Suivi commandes</div>
                <div className="order-tracking-container-content">
                    {/* Displau orders in descending date order*/}
                    {order.map(order => (
                        <div key={order._id} className="order-tracking-container-content-items">
                            <div className="order-tracking-container-content-item-top">
                                {/* If status=-1 <=> order refused by restaurant */}
                                {order.status === -1 && (
                                    <div>
                                        <div className="order-tracking-container-content-item-top-cases">
                                            <div className="order-tracking-container-content-item-top-case" id="refused"></div>
                                            <div className="order-tracking-container-content-item-top-case" id="refused"></div>
                                            <div className="order-tracking-container-content-item-top-case" id="refused"></div>
                                            <div className="order-tracking-container-content-item-top-case" id="refused"></div>
                                        </div>
                                        <div className="order-tracking-container-content-item-top-state" id="alert-refused">Commande refusée</div>
                                    </div>
                                )}
                                {/* If status=0 <=> basket validated */}
                                {order.status === 0 && (
                                    <div>
                                        <div className="order-tracking-container-content-item-top-cases">
                                            <div className="order-tracking-container-content-item-top-case" id="in-progress"></div>
                                            <div className="order-tracking-container-content-item-top-case" id="to-do"></div>
                                            <div className="order-tracking-container-content-item-top-case" id="to-do"></div>
                                            <div className="order-tracking-container-content-item-top-case" id="to-do"></div>
                                        </div>
                                        <div className="order-tracking-container-content-item-top-state">En attente de confirmation de la part du restaurant</div>
                                    </div>
                                )}
                                {/* If status=1 <=> order validated by restaurant */}
                                {order.status === 1 && (
                                    <div>
                                        <div className="order-tracking-container-content-item-top-cases">
                                            <div className="order-tracking-container-content-item-top-case" id="done"></div>
                                            <div className="order-tracking-container-content-item-top-case" id="in-progress"></div>
                                            <div className="order-tracking-container-content-item-top-case" id="to-do"></div>
                                            <div className="order-tracking-container-content-item-top-case" id="to-do"></div>
                                        </div>
                                        <div className="order-tracking-container-content-item-top-state">En cours de préparation</div>
                                    </div>
                                )}
                                {/* If status=2 <=> the delivery person is on his way to the restaurant */}
                                {order.status === 2 && (
                                    <div>
                                        <div className="order-tracking-container-content-item-top-cases">
                                            <div className="order-tracking-container-content-item-top-case" id="done"></div>
                                            <div className="order-tracking-container-content-item-top-case" id="done"></div>
                                            <div className="order-tracking-container-content-item-top-case" id="in-progress"></div>
                                            <div className="order-tracking-container-content-item-top-case" id="to-do"></div>
                                        </div>
                                        <div className="order-tracking-container-content-item-top-state">Le livreur va récupérer votre commande</div>
                                    </div>
                                )}
                                {/* If status=3 <=> the delivery person is on his way to the point of delivery */}
                                {order.status === 3 && (
                                    <div>
                                        <div className="order-tracking-container-content-item-top-cases">
                                            <div className="order-tracking-container-content-item-top-case" id="done"></div>
                                            <div className="order-tracking-container-content-item-top-case" id="done"></div>
                                            <div className="order-tracking-container-content-item-top-case" id="done"></div>
                                            <div className="order-tracking-container-content-item-top-case" id="in-progress"></div>
                                        </div>
                                        <div className="order-tracking-container-content-item-top-state">Le livreur se dirige vers le point de livraison</div>
                                    </div>
                                )}
                                {/* If status=4 <=> order delivered */}
                                {order.status === 4 && (
                                    <div>
                                        <div className="order-tracking-container-content-item-top-cases">
                                            <div className="order-tracking-container-content-item-top-case" id="done-done"></div>
                                            <div className="order-tracking-container-content-item-top-case" id="done-done"></div>
                                            <div className="order-tracking-container-content-item-top-case" id="done-done"></div>
                                            <div className="order-tracking-container-content-item-top-case" id="done-done"></div>
                                        </div>
                                        <div className="order-tracking-container-content-item-top-state" id="alert-done">Commande livrée</div>
                                    </div>
                                )}
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
            </div>
        </div>
    )
}

export default OrderTracking;