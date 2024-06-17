import React, { useState } from 'react';
import '../../styles/restaurant/accountRestaurant.css';
import Banniere from '../../assets/Kebab.jpeg';
import MobileHeader2 from '../../components/MobileHeader2';

const AccountRestaurant = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [nom, setNom] = useState('Aladin');
    const [categorie, setCategorie] = useState('Kebab');
    const [adresse, setAdresse] = useState('2 Pl. Ravezies, 33300 Bordeaux');
    const [email, setEmail] = useState('aladdin@aladdin.fr');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    return (
        <div className="account-page">
            <MobileHeader2 />
            <main className="account-content">
                <div className="header-container">
                    <h1>Mon compte</h1>
                    {!isEditing && <button className="edit-button" onClick={handleEditClick}>Modifier</button>}
                    {isEditing && <button className="edit-button" onClick={handleSaveClick}>Sauvegarder</button>}
                </div>
                <div className="profile-section">
                    <img src={Banniere} alt="Bannière Restaurant" className="bannière" />
                    <p>Bannière Restaurant</p>
                </div>
                <div className="user-info">
                    <div className="info-item">
                        <span className="label">Nom</span>
                        {isEditing ? <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} /> : <span className="value">{nom}</span>}
                    </div>
                    <div className="info-item">
                        <span className="label">Catégorie</span>
                        {isEditing ? <input type="text" value={categorie} onChange={(e) => setCategorie(e.target.value)} /> : <span className="value">{categorie}</span>}
                    </div>
                    <div className="info-item">
                        <span className="label">Email</span>
                        {isEditing ? <input type="tel" value={email} onChange={(e) => setEmail(e.target.value)} /> : <span className="value">{email}</span>}
                    </div>
                    <div className="info-item">
                        <span className="label">Adresse</span>
                        {isEditing ? <input type="email" value={adresse} onChange={(e) => setAdresse(e.target.value)} /> : <span className="value">{adresse}</span>}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AccountRestaurant;
