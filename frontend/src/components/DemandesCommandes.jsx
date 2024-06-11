import React from 'react';
import "../styles/DemandesCommandes.css";
import accept from '../assets/valid.png';
import deny from "../assets/croix.png";

const DemandesCommandes = (props) => {
    const { details, heure, onAccept, onDeny } = props;

    return (
        <section className="demandes-box">
            <div className='details'>
                {details}
            </div>
            <div className='heure'>
                {heure}
            </div>
            <button className='deny-button' onClick={onDeny}>
                <img src={deny} alt="Deny" />
            </button>
            <button className='accept-button' onClick={onAccept}>
                <img src={accept} alt="Accept" />
            </button>
        </section>
    );
}

export default DemandesCommandes;
