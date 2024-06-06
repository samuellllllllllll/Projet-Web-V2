import React from "react";
import "../styles/header.css";
import logo from '../assets/logo.png'

const header= () => {

    const countOrder = 0;

    return (
        <header className="header">
            <a href="/consommateur"><img className="logo-header" src={logo} alt="logo CESI'Eats" /></a>
            <div className="header-right-part">
                <div className="header-text">
                    <a href="/consommateur/panier" id="order">Panier | {countOrder} </a>
                </div>
                <div className="header-text">
                    <a href="/consommateur/compte" id="account">Mon compte</a>
                </div>
            </div>
        </header>
    );
}

export default header;