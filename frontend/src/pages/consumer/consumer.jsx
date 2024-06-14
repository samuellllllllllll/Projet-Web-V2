import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/consumer/consumer.css';
import Footer from '../../components/Footer.jsx';
import Header from '../../components/Header.jsx';
import Restaurant_card from '../../components/Restaurant_card.jsx';
import Sandwich from '../../assets/sandwich.png';
import Pizza from '../../assets/pizza.png';
import Sushi from '../../assets/sushi.png';
import Burger from '../../assets/burger.png';
import Kebab from '../../assets/kebab.png';
import Ramen from '../../assets/ramen.png';
import Salade from '../../assets/salade.png';
import Pâtes from '../../assets/pâtes.png';
import Autres from '../../assets/autres.png';

const consumer = () => {

  // restaurants sur autre par défaut
  const [restaurants, setRestaurants] = useState([]);

  const handleTypeChange = async (restaurantType) => {
    try {
      const response = await axios.get('http://localhost:4546/restaurants', {
        params: { type: restaurantType },
      });
      setRestaurants(response.data);
      console.log(response.data);

      // If no restaurant found, display a message
      if (response.data.length === 0) {
        setRestaurants([{ name: 'Aucun restaurant trouvé' }]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="consumer">
      <Header />
      <div className="consumer-container">
        <div className="consumer-title">Hello Victor !</div>
        <div className="consumer-text">Que veux tu commander ?</div>
        <div className="consumer-categories">
          <div className="consumer-category" onClick={() => handleTypeChange("Sandwich")}>
            <img src={Sandwich} alt="sandwich" />
            <p>Sandwich</p>
          </div>
          <div className="consumer-category" onClick={() => handleTypeChange("Pizza")}>
            <img src={Pizza} alt="pizza" />
            <p>Pizza</p>
          </div>
          <div className="consumer-category" onClick={() => handleTypeChange("Sushi")}>
            <img src={Sushi} alt="sushi" />
            <p>Sushi</p>
          </div>
          <div className="consumer-category" onClick={() => handleTypeChange("Burger")}>
            <img src={Burger} alt="burger" />
            <p>Burger</p>
          </div>
          <div className="consumer-category" onClick={() => handleTypeChange("Kebab")}>
            <img src={Kebab} alt="kebab" />
            <p>Kebab</p>
          </div>
          <div className="consumer-category" onClick={() => handleTypeChange("Ramen")}>
            <img src={Ramen} alt="ramen" />
            <p>Ramen</p>
          </div>
          <div className="consumer-category" onClick={() => handleTypeChange("Salade")}>
            <img src={Salade} alt="salade" />
            <p>Salade</p>
          </div>
          <div className="consumer-category" onClick={() => handleTypeChange("Pâtes")}>
            <img src={Pâtes} alt="pâtes" />
            <p>Pâtes</p>
          </div>
          <div className="consumer-category" onClick={() => handleTypeChange("Autres")}>
            <img src={Autres} alt="autres" />
            <p>Autres</p>
          </div>
         </div>
        <div className="consumer-restaurants">
          <div className="consumer-restaurants-map">
            {restaurants.map((restaurant) => (
              // If restaurant is empty, display a message
              restaurant.name === 'Aucun restaurant trouvé' ? (
                <div key={restaurant.name} className="consumer-no-restaurant">
                  {restaurant.name}
                </div>
              ) : (
                <Restaurant_card image={restaurant["url_logo"]} title={restaurant["name"]} />
              )
            ))}
          </div>
        </div>
      </div>
      <Footer className="footer"/>
    </div>
  )
}

export default consumer;