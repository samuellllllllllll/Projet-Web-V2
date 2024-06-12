import React, { useState } from 'react';
import '../../styles/deliveryman/account.css';
import logo from '../../assets/logo.png';
import menuIcon from '../../assets/menu.png';
import profileIcon from '../../assets/utilisateur.png'; // Assume this is the profile icon image
import MobileHeader from '../../components/MobileHeader';

const Account = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [nom, setNom] = useState('Vincent');
    const [prenom, setPrenom] = useState('Verlaan');
    const [telephone, setTelephone] = useState('06 06 06 06 06');
    const [email, setEmail] = useState('vincent.verlaan@cesieats.fr');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Ajouter la logique pour sauvegarder les modifications
    };

    return (
        <div className="account-page">
            <MobileHeader />
            <main className="account-content">
                <div className="header-container">
                    <h1>Mon compte</h1>
                    {!isEditing && <button className="edit-button" onClick={handleEditClick}>Modifier</button>}
                    {isEditing && <button className="edit-button" onClick={handleSaveClick}>Sauvegarder</button>}
                </div>
                <div className="profile-section">
                    <img src={profileIcon} alt="Photo de profil" className="profile-icon" />
                    <p>Photo de profil</p>
                </div>
                <div className="user-info">
                    <div className="info-item">
                        <span className="label">Nom</span>
                        {isEditing ? <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} /> : <span className="value">{nom}</span>}
                    </div>
                    <div className="info-item">
                        <span className="label">Prénom</span>
                        {isEditing ? <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} /> : <span className="value">{prenom}</span>}
                    </div>
                    <div className="info-item">
                        <span className="label">Téléphone</span>
                        {isEditing ? <input type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} /> : <span className="value">{telephone}</span>}
                    </div>
                    <div className="info-item">
                        <span className="label">Email</span>
                        {isEditing ? <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> : <span className="value">{email}</span>}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Account;
