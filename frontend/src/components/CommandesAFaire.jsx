import React from 'react'
import "../styles/CommandesAFaire.css";

const CommandesAFaire = (props) => {
    const { details, heure, id } = props;
    return (
        <div className="demandes-box-2">
            <div className='details-2'>
                {details}
            </div>
            <div className='heure-2'>
                {heure}
            </div>
            <div className='id'>
                {id}
            </div>
        </div>
    );
}

export default CommandesAFaire