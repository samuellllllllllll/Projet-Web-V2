import React from 'react';
import PropTypes from 'prop-types';
import '../styles/menuDeliveryman.css';
import logo from '../assets/logo.png';

const MenuDeliveryman = ({ isOpen, onClose, activeMenu }) => {
    if (!isOpen) return null;

    return (
        <div className="menu-overlay" role="dialog" aria-modal="true" aria-labelledby="menu-title">
            <div className="menu-content">
                <button className="menu-close" onClick={onClose} aria-label="Close menu">X</button>
                <img src={logo} alt="Logo" className="menu-logo" />
                <div className="menu-main">
                    <ul>
                        <li><a href="#deliver" style={activeMenu === 'deliver' ? { color: '#FF7B00', fontSize: '2.5em' } : null}>Faire une livraison</a></li>
                        <li><a href="#delivered" style={activeMenu === 'delivered' ? { color: '#FF7B00', fontSize: '2.5em' } : null}>Commandes livrées</a></li>
                        <li><a href="#account" style={activeMenu === 'account' ? { color: '#FF7B00', fontSize: '2.5em' } : null}>Mon compte</a></li>
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
