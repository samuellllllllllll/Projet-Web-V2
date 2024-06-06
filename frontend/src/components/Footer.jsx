import React from "react";
import "../styles/footer.css";
import logo from '../assets/logo.png'

const footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <a href="/consommateur"><img className="logo-footer" src={logo} alt="logo CESI'Eats" /></a>
                <div className="footer-right-part">
                    <div className="footer-text">
                        <a href="/consommateur/panier">Commande</a>
                    </div>
                    <div className="footer-text">
                        <a href="/consommateur/compte">Mon compte</a>
                    </div>
                    <div className="footer-text">
                        <a href="/consommateur">Mentions légales</a>
                    </div>
                    <div className="footer-text">
                        <p>© 2024 CESI'Eats</p>
                    </div>
                </div>
            </div>

        </footer>
    );
}

export default footer;