import React, { useState } from 'react';
import '../styles/deliveryman.css';
import logo from '../assets/logo.png';
import menuIcon from '../assets/menu.png';

const deliveryman = () => {

  return (
    <div className="menu-page">
      <header className="menu-header">
        <img src={logo} alt="logo CESI'Eats" className="logo" />
        <img src={menuIcon} alt="Menu Icon" className="menuIcon" />
      </header>
      <h1>Choisissez une commande à livrer </h1>
      <th>Détail</th>
      <th>Heure récupération</th>
      <th>ID</th>
    </div>
  )
}

export default deliveryman;