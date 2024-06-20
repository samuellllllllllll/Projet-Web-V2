import React, { useState, useEffect, useContext } from 'react';
import "../../styles/consumer/account.css";
import Footer from '../../components/Footer.jsx';
import Header from '../../components/Header.jsx';
import axios from 'axios';
import AuthContext from '../../authContext.jsx';


const Account = () => {

    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [userInfo, setUserInfo] = useState({
        phone: "",
        email: "",
        city: "",
        postal_code: "",
        street: "",
        number: "",
        country: "",
    });
    const [userPassword, setUserPassword] = useState({
        password: "",
        password_confirm: ""
    });
    const { logout } = useContext(AuthContext);

    const handleEditClickInfo = () => {
        setIsEditingInfo(true);
        setIsEditingPassword(null)
    };

    const handleEditClickPassword = () => {
        setIsEditingPassword(true);
        setIsEditingInfo(null)
    };

    const handleSaveClickInfo = async () => {
        setIsEditingInfo(false);
        setIsEditingPassword(false);

        // Update the user informations
        try{
            const response = await axios.put('http://localhost:4549/account/consumer/update_info', {
                params: {
                    phone: userInfo.phone,
                    email: userInfo.email,
                    address_city: userInfo.city,
                    address_postal_code: userInfo.postal_code,
                    address_street: userInfo.street,
                    address_number: userInfo.number,
                    adresse_country: userInfo.country,
                    id: 1 // TO BE CHANGED
                }
            });
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleSaveClickPassword = async () => {

        if (userPassword.password === '') {
            setMessageAlert('Veuillez entrer un mot de passe.');
            return;
        }

        if (userPassword.password !== userPassword.password_confirm) {
            setMessageAlert('Les mots de passe ne correspondent pas.');
            return;
        }
    
        if (userPassword.password.length < 8) {
            setMessageAlert('Le mot de passe doit contenir au moins 8 caractères.');
            return;
        }

        // Show a validation message during 3 seconds
        setMessageAlert('Mot de passe modifié avec succès.');

        // Update the user password
        try{
            const response = await axios.put('http://localhost:4549/account/consumer/update_password', {
                params: {
                    password: userPassword.password,
                    id: 1 // TO BE CHANGED
                }
            });
        } catch (error) {
            console.error('Error updating data:', error);
        }
        setTimeout(() => {
            setMessageAlert('');
            setIsEditingPassword(false);
            setIsEditingInfo(false);
            userPassword.password = '';
            userPassword.password_confirm = '';
        }, 3000);
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

    const handleInputChangeInfo = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const handleInputChangePassword = (e) => {
        const { name, value } = e.target;
        setUserPassword({
            ...userPassword,
            [name]: value
        });
    };

    const handleDisconnectClick = () => {
        // Disconnect the user
        logout();

        // Redirect to the home page
        window.location.href = '/';
    };

    const loadInfoUser = async () => {
        try {
            const response = await axios.get('http://localhost:4549/account/consumer', {
                params: { id: 1 }, // TO BE CHANGED
            });
            // Change the data in user
            setUserInfo(response.data);
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
                <div className="account-title">Mon compte</div>
                <div className="account-details">
                    <div className="account-details-top">
                        {isEditingInfo === false && <div className="account-button"><button onClick={handleEditClickInfo}>Modifier informations personelles</button></div>}
                        {isEditingInfo === false && <div className="account-button"><button onClick={handleEditClickPassword}>Modifier mot de passe</button></div>}
                        {isEditingInfo === false && <div className="account-button"><button onClick={handleDeleteClick}>Supprimer mon compte</button></div>}
                        {isEditingInfo === false && <div className="account-button"><button onClick={handleDisconnectClick}>Déconnexion</button></div>}
                        {isEditingInfo == true && <div className="account-button"><button onClick={handleSaveClickInfo}>Sauvegarder informations personnelles</button></div>}
                        {isEditingPassword === true && <div className="account-button"><button onClick={handleSaveClickPassword}>Sauvegarder mot de passe</button></div>}
                        {messageAlert !== '' && <div className="account-alert">{messageAlert}</div>}
                    </div>
                    {isEditingPassword === true &&
                        <div className="account-details-password">
                            <p>Entrez votre nouveau mot de passe</p>
                            <input name="password" type="password" value={userPassword.password} onChange={handleInputChangePassword} placeholder='Entrez votre nouveau mot de passe'/>
                            <input name="password_confirm" type="password" value={userPassword.password_confirm} onChange={handleInputChangePassword} placeholder='Confirmer votre nouveau mot de passe'/>
                        </div>
                    }
                    {(isEditingInfo === true || isEditingInfo === false) && 
                        <div className="account-details-info">
                            <div className="account-details-left">
                                <p>Téléphone</p>
                                <p>Email</p>
                                <p>Pays adresse</p>
                                <p>Ville adresse</p>
                                <p>Code postal adresse</p>
                                <p>Rue adresse</p>
                                <p>Numéro adresse</p>
                            </div>
                            <div className="account-details-right">
                                {isEditingInfo === true &&
                                    <>
                                        <input name="phone" type="text" value={userInfo.phone} onChange={handleInputChangeInfo} />
                                        <input name="email" type="text" value={userInfo.email} onChange={handleInputChangeInfo} />
                                        <input name="country" type="text" value={userInfo.country} onChange={handleInputChangeInfo} />
                                        <input name="city" type="text" value={userInfo.city} onChange={handleInputChangeInfo} />
                                        <input name="postal_code" type="text" value={userInfo.postal_code} onChange={handleInputChangeInfo} />
                                        <input name="street" type="text" value={userInfo.street} onChange={handleInputChangeInfo} />
                                        <input name="number" type="text" value={userInfo.number} onChange={handleInputChangeInfo} />
                                    </>
                                }
                                {isEditingInfo === false &&
                                    <>
                                        <input name="phone" type="text" className="disabled-input" value={userInfo.phone} disabled />
                                        <input name="email" type="text" className="disabled-input" value={userInfo.email} disabled />
                                        <input name="country" type="text" className="disabled-input" value={userInfo.country} disabled />
                                        <input name="city" type="text" className="disabled-input" value={userInfo.city} disabled />
                                        <input name="postal_code" type="text" className="disabled-input" value={userInfo.postal_code} disabled />
                                        <input name="street" type="text" className="disabled-input" value={userInfo.street} disabled />
                                        <input name="number" type="text" className="disabled-input" value={userInfo.number} disabled />
                                    </>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Account;
