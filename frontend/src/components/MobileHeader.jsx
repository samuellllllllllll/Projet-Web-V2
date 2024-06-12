import React, { useState } from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/logo.png';
import menuIcon from '../assets/menu.png';
import '../styles/MobileHeader.css';
import MenuDeliveryman from '../components/menuDeliveryman';

const MobileHeader = () => {
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
            <MenuDeliveryman isOpen={isMenuOpen} onClose={toggleMenu} activeMenu="deliver" />
        </div>
    );
}

MobileHeader.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    activeMenu: PropTypes.string,
};

export default MobileHeader;
