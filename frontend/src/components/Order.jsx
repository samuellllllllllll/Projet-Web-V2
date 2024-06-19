import React from 'react';
import PropTypes from 'prop-types';
import '../styles/deliveryman/deliveryman.css';

const Order = ({ order, isSelected, onClick }) => (
    <tr
        className={`order-row ${isSelected ? 'selected' : ''}`}
        onClick={() => onClick(order)}
        role="button"
        tabIndex={0}
        onKeyPress={() => onClick(order)}
    >
        <td>{order.distance}</td>
        <td>{order.restaurant}</td>
        <td>{order.montant}</td>
    </tr>
);

Order.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.string.isRequired,
        distance: PropTypes.string.isRequired,
        restaurant: PropTypes.string.isRequired,
        montant: PropTypes.string.isRequired,
    }).isRequired,
    isSelected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Order;
