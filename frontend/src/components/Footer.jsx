import React from "react";
import "../styles/footer.css";
import logo from '../assets/logo.png'

const footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <a href="/consumer"><img className="logo-footer" src={logo} alt="logo CESI'Eats" /></a>
                <div className="footer-right-part">
                    <div className="footer-text">
                        <a href="/consumer">Commande</a>
                    </div>
                    <div className="footer-text">
                        <a href="/consumer">Mon compte</a>
                    </div>
                    <div className="footer-text">
                        <a href="/consumer">Mentions légales</a>
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