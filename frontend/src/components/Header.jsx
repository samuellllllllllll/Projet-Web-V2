import React from "react";
import "../styles/header.css";
import logo from '../assets/logo.png'

const header= () => {
    return (
        <header className="header">
            <a href="/consumer"><img className="logo-header" src={logo} alt="logo CESI'Eats" /></a>
            <div className="header-right-part">
                <div className="header-text">
                    <a href="/consumer" id="order">Panier | </a>
                </div>
                <div className="header-text">
                    <a href="/consumer" id="account">Mon compte</a>
                </div>
            </div>
        </header>
    );
}

export default header;