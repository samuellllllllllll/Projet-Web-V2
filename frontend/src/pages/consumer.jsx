import React from 'react';
import '../styles/consumer.css';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';

const consumer = () => {

  return (
    <div className="consumer-container">
      <Header />
      <div className="consumer-title">Hello Victor !</div>
      <div className="consumer-text">Que veux tu commander ?</div>
      <div className="consumer-categories">
        <div className="consumer-category"></div>
        <div className="consumer-category"></div>
        <div className="consumer-category"></div>
        <div className="consumer-category"></div>
        <div className="consumer-category"></div>
        <div className="consumer-category"></div>
        <div className="consumer-category"></div>
        <div className="consumer-category"></div>
        <div className="consumer-category"></div>
      </div>

      <Footer />
    </div>
  )
}

export default consumer;