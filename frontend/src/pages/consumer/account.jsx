import React from "react";
import "../../styles/consumer/account.css";
import Footer from '../../components/Footer.jsx';
import Header from '../../components/Header.jsx';

const Account = () => {
    const user = {
        lastName: "BILLAT",
        firstName: "Victor",
        phone: "06 12 34 56 78",
        email: "victor@cesieats.fr",
        address: "1 rue de la paix 75000 Paris"
    };

    return (
        <div className="account">
            <Header />
            <div className="account-container">
                <div className="account-title">Mon compte</div>
                <div className="account-details">
                    <div className="account-details-left">
                        <p>Nom</p>
                        <p>Prénom</p>
                        <p>Téléphone</p>
                        <p>Email</p>
                        <p>Adresse</p>
                    </div>
                    <div className="account-details-right">
                        <p>{user.lastName}</p>
                        <p>{user.firstName}</p>
                        <p>{user.phone}</p>
                        <p>{user.email}</p>
                        <p>{user.address}</p>
                    </div>
                </div>
                <div>
                    <button className="account-button">Modifier mes informations</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Account;