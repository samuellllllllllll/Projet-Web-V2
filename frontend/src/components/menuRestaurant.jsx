import React from 'react';
import PropTypes from 'prop-types';
import '../styles/menuRestaurant.css';
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
                        <li><a href="#Commandes à faire" onClick={() => handleLinkClick('/restaurant')} style={currentPath === '/restaurant' ? { color: '#FF7B00', fontSize: '2.5em' } : null}>Commandes à faire</a></li>
                        <li><a href="#Commandes faites" onClick={() => handleLinkClick('/delivered')} style={currentPath === '/delivered' ? { color: '#FF7B00', fontSize: '2.5em' } : null}>Commandes faites</a></li>
                        <li><a href="#Statistiques" onClick={() => handleLinkClick('/statistiques')} style={currentPath === '/statistiques' ? { color: '#FF7B00', fontSize: '2.5em' } : null}>Statistiques</a></li>
                        <li><a href="#Menu" onClick={() => handleLinkClick('/menu')} style={currentPath === '/menu' ? { color: '#FF7B00', fontSize: '2.5em' } : null}>Menu</a></li>
                        <li><a href="#Mon compte" onClick={() => handleLinkClick('/restaurantAccount')} style={currentPath === '/restaurantAccount' ? { color: '#FF7B00', fontSize: '2.5em' } : null}>Mon compte</a></li>
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
