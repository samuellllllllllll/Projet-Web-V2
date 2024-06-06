import React from 'react'
import "../styles/CommandesAFaire.css";

const CommandesAFaire = (props) => {
    const { details, heure, id } = props;
    return (
        <div className="demandes-box">
            <div className='details'>
                {details}
            </div>
            <div className='heure'>
                {heure}
            </div>
            <div className='id'>
                {id}
            </div>
        </div>
    );
}

export default CommandesAFaire