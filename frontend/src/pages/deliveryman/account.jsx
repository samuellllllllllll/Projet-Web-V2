import React from 'react'
import logo from '../../assets/logo.png';
import menuIcon from '../../assets/menu.png';

const account = () => {

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="menu-header">
            <img src={logo} alt="logo CESI'Eats" className="logo" />
            <img src={menuIcon} alt="Menu Icon" className="menuIcon" onClick={toggleMenu} />
        </header>
    );
};

export default account