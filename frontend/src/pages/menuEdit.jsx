import React from 'react';
import '../styles/menuEdit.css';
import logo from '../assets/logo.png';
import coca from '../assets/coca.jpg';
import fanta from '../assets/fanta.jpg';
import tacos from '../assets/tacos.jpg';
import kebab from '../assets/Kebab.jpeg';
import menuIcon from '../assets/menu.png';

const MenuEdit = () => {
    return (
        <div className="menu-page">
            <header className="menu-header">
                <img src={logo} alt="logo CESI'Eats" className="logo" />
                <img src={menuIcon} alt="Menu Icon" className="menuIcon" />
            </header>
            <nav className="menu-nav">
                <h1 className="menu-title">Menu</h1>
                <button className="edit-button">Modifier</button>
            </nav>
            <section className="menu-section">
                <h2 className="section-title">Boissons</h2>
                <div className="menu-items">
                    <div className="menu-item-1">
                        <img src={coca} alt="Coca Cola 33cl" />
                        <p className="item-name">Coca Cola 33cl</p>
                        <p className="item-price">1 €</p>
                    </div>
                    <div className="menu-item-2">
                        <img src={fanta} alt="Fanta 33cl" />
                        <p className="item-name">Fanta 33cl</p>
                        <p className="item-price">1 €</p>
                    </div>
                </div>
            </section>
            <section className="menu-section">
                <h2 className="section-title">Plats</h2>
                <div className="menu-items">
                    <div className="menu-item-1">
                        <img src={kebab} alt="Kebab" />
                        <p className="item-name">Kebab</p>
                        <p className="item-price">8 €</p>
                    </div>
                    <div className="menu-item-2">
                        <img src={tacos} alt="Tacos" />
                        <p className="item-name">Tacos</p>
                        <p className="item-price">8 €</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MenuEdit;