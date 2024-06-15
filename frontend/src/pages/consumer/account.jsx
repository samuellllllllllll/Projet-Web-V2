import React, { useState } from 'react';
import "../../styles/consumer/account.css";
import Footer from '../../components/Footer.jsx';
import Header from '../../components/Header.jsx';

const Account = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        lastName: "BILLAT",
        firstName: "Victor",
        phone: "06 12 34 56 78",
        email: "victor@cesieats.fr",
        address: "1 rue de la paix 75000 Paris"
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    return (
        <div className="account">
            <Header />
            <div className="account-container">
                <div className="account-title">Mon compte
                    {!isEditing && <button className="edit-button" onClick={handleEditClick}>Modifier</button>}
                    {isEditing && <button className="edit-button" onClick={handleSaveClick}>Sauvegarder</button>}
                </div>
                <div className="account-details">
                    <div className="account-details-left">
                        <p>Nom</p>
                        <p>Prénom</p>
                        <p>Téléphone</p>
                        <p>Email</p>
                        <p>Adresse</p>
                    </div>
                    <div className="account-details-right">
                        {isEditing ? <input type="text" name="lastName" value={user.lastName} onChange={handleInputChange} /> : <p>{user.lastName}</p>}
                        {isEditing ? <input type="text" name="firstName" value={user.firstName} onChange={handleInputChange} /> : <p>{user.firstName}</p>}
                        {isEditing ? <input type="text" name="phone" value={user.phone} onChange={handleInputChange} /> : <p>{user.phone}</p>}
                        {isEditing ? <input type="text" name="email" value={user.email} onChange={handleInputChange} /> : <p>{user.email}</p>}
                        {isEditing ? <input type="text" name="address" value={user.address} onChange={handleInputChange} /> : <p>{user.address}</p>}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Account;
