import React from 'react';
import '../styles/menuEdit.css';
import logo from '../assets/logo.png';
import coca from '../assets/coca.jpg';
import fanta from '../assets/fanta.jpg';
import tacos from '../assets/tacos.jpg';
import kebab from '../assets/Kebab.jpeg';
import menuIcon from '../assets/menu.png';
import FoodCard from '../components/FoodCard';

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
            <h2 className="section-title">Boissons</h2>
            <section className="card-row">
                <section className='card-left'>
                    <FoodCard
                        images={coca}
                        name="Coca Cola"
                        price="1€"
                    />
                </section>
                <section className="card-right">
                    <FoodCard
                        images={fanta}
                        name="Fanta"
                        price="1€"
                    />
                </section>
            </section>
            <h2 className="section-title">Plats</h2>
            <section className="card-row">
                <section className='card-left'>
                    <FoodCard
                        images={kebab}
                        name="Kebab"
                        price="8€"
                    />
                </section>
                <section className="card-right">
                    <FoodCard
                        images={tacos}
                        name="Tacos"
                        price="8€"
                    />
                </section>
            </section>
        </div >
    );
};

export default MenuEdit;