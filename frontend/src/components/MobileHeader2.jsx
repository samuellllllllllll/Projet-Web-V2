import React, { useState } from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/logo.png';
import menuIcon from '../assets/menu.png';
import '../styles/MobileHeader2.css';
import MenuRestaurant from '../components/menuRestaurant';

const MobileHeader2 = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='page'>
            <header className="mobile-header">
                <img src={logo} alt="logo CESI'Eats" className="logo-header-2" />
                <img
                    src={menuIcon}
                    alt="Menu Icon"
                    className="menu-icon"
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-controls="menu-deliveryman"
                />
            </header>
            <MenuRestaurant isOpen={isMenuOpen} onClose={toggleMenu} />
        </div>
    );
}

MobileHeader2.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    activeMenu: PropTypes.string,
};

export default MobileHeader2;
