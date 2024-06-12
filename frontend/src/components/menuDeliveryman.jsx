import React from 'react';
import PropTypes from 'prop-types';
import '../styles/menuDeliveryman.css';
import logo from '../assets/logo.png';

const MenuDeliveryman = ({ isOpen, onClose }) => {
    const currentPath = window.location.pathname;

    const handleLinkClick = (path) => {
        if (currentPath === path) {
            return;
        }
        window.location.pathname = path;
    };

    if (!isOpen) return null;

    return (
        <div className="menu-overlay" role="dialog" aria-modal="true" aria-labelledby="menu-title">
            <div className="menu-content">
                <button className="menu-close" onClick={onClose} aria-label="Close menu">X</button>
                <img src={logo} alt="Logo" className="menu-logo" />
                <div className="menu-main">
                    <ul>
                        <li><a href="#livreur" onClick={() => handleLinkClick('/livreur')} style={currentPath === '/livreur' ? { color: '#FF7B00', fontSize: '2.5em' } : null}>Faire une livraison</a></li>
                        <li><a href="#delivered" onClick={() => handleLinkClick('/delivered')} style={currentPath === '/delivered' ? { color: '#FF7B00', fontSize: '2.5em' } : null}>Commandes livrées</a></li>
                        <li><a href="#deliverymanAccount" onClick={() => handleLinkClick('/deliverymanAccount')} style={currentPath === '/deliverymanAccount' ? { color: '#FF7B00', fontSize: '2.5em' } : null}>Mon compte</a></li>
                    </ul>
                </div>
                <footer className="menu-footer">
                    <a href="#legal">Mentions légales</a>
                </footer>
            </div>
        </div>
    );
};

MenuDeliveryman.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    activeMenu: PropTypes.string
};

export default MenuDeliveryman;
