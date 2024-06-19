import React, { useState, useEffect } from 'react';
import "../../styles/consumer/account.css";
import Footer from '../../components/Footer.jsx';
import Header from '../../components/Header.jsx';
import axios from 'axios';

const Account = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        phone: "",
        email: "",
        city: "",
        postal_code: "",
        street: "",
        number: "",
        country: "",
        password: "",
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setIsEditing(false);

        // Update the user informations
        try{
            const response = await axios.put('http://localhost:4549/account/consumer/update', {
                params: {
                    phone: user.phone,
                    email: user.email,
                    address_city: user.city,
                    address_postal_code: user.postal_code,
                    address_street: user.street,
                    address_number: user.number,
                    adresse_country: user.country,
                    id: 1 // TO BE CHANGED
                }
            });
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleDeleteClick = async () => {
        // Delete the user account
        try{
            const response = await axios.put('http://localhost:4549/account/consumer/delete', {
                params: {
                    id: 1 // TO BE CHANGED
                }
            });
        }
        catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const loadInfoUser = async () => {
        try {
            const response = await axios.get('http://localhost:4549/account/consumer', {
                params: { id: 1 }, // TO BE CHANGED
            });
            // Change the data in user
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Load user informations when the page is loaded
    useEffect(() => {
        loadInfoUser();
    }, []);

    return (
        <div className="account">
            <Header />
            <div className="account-container">
                <div className="account-title">Mon compte
                    {!isEditing && <button className="edit-button" onClick={handleEditClick}>Modifier</button>}
                    {isEditing && <button className="edit-button" onClick={handleSaveClick}>Sauvegarder</button>}
                </div>
                <div className="account-details">
                    {isEditing && 
                    <div className="delete-button-div">
                        <button className="delete-button" onClick={handleDeleteClick}>Supprimer mon compte</button>
                    </div>
                    }
                    <div className="account-details-bottom">
                        <div className="account-details-left">
                            <p>Téléphone</p>
                            <p>Email</p>
                            <p>Mot de passe</p>
                            <p>Pays adresse</p>
                            <p>Ville adresse</p>
                            <p>Code postal adresse</p>
                            <p>Rue adresse</p>
                            <p>Numéro adresse</p>
                        </div>
                        <div className="account-details-right">
                            {isEditing ? (
                                <>
                                    <input name="phone" type="text" value={user.phone} onChange={handleInputChange} />
                                    <input name="email" type="text" value={user.email} onChange={handleInputChange} />
                                    <input name="password" type="text" value={user.password} onChange={handleInputChange} />
                                    <input name="country" type="text" value={user.country} onChange={handleInputChange} />
                                    <input name="city" type="text" value={user.city} onChange={handleInputChange} />
                                    <input name="postal_code" type="text" value={user.postal_code} onChange={handleInputChange} />
                                    <input name="street" type="text" value={user.street} onChange={handleInputChange} />
                                    <input name="number" type="text" value={user.number} onChange={handleInputChange} />
                                    
                                </>
                            ) : (
                                <>
                                    <input name="phone" type="text" className="disabled-input" value={user.phone} disabled />
                                    <input name="email" type="text" className="disabled-input" value={user.email} disabled />
                                    <input name="password" type="text" className="disabled-input" value={user.password} disabled />
                                    <input name="country" type="text" className="disabled-input" value={user.country} disabled />
                                    <input name="city" type="text" className="disabled-input" value={user.city} disabled />
                                    <input name="postal_code" type="text" className="disabled-input" value={user.postal_code} disabled />
                                    <input name="street" type="text" className="disabled-input" value={user.street} disabled />
                                    <input name="number" type="text" className="disabled-input" value={user.number} disabled />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Account;
