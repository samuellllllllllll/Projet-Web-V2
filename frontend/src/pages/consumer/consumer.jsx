import React from 'react';
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

  return (
    <div className="consumer">
      <Header />
      <div className="consumer-container">
        <div className="consumer-title">Hello Victor !</div>
        <div className="consumer-text">Que veux tu commander ?</div>
        <div className="consumer-categories">
          <div className="consumer-category">
            <img src={Sandwich} alt="sandwich" />
            <p>Sandwich</p>
          </div>
          <div className="consumer-category">
            <img src={Pizza} alt="pizza" />
            <p>Pizza</p>
          </div>
          <div className="consumer-category">
            <img src={Sushi} alt="sushi" />
            <p>Sushi</p>
          </div>
          <div className="consumer-category">
            <img src={Burger} alt="burger" />
            <p>Burger</p>
          </div>
          <div className="consumer-category">
            <img src={Kebab} alt="kebab" />
            <p>Kebab</p>
          </div>
          <div className="consumer-category">
            <img src={Ramen} alt="ramen" />
            <p>Ramen</p>
          </div>
          <div className="consumer-category">
            <img src={Salade} alt="salade" />
            <p>Salade</p>
          </div>
          <div className="consumer-category">
            <img src={Pâtes} alt="pâtes" />
            <p>Pâtes</p>
          </div>
          <div className="consumer-category">
            <img src={Autres} alt="autres" />
            <p>Autres</p>
          </div>
         </div>
        <div className="consumer-restaurants">
          <Restaurant_card
            link="/consumer"
            image="https://lh3.googleusercontent.com/p/AF1QipMYiYNeAb--caulTsF8hGu80VCm7Lh1lt53HbUC=s1360-w1360-h1020"
            title="Aladdin Ravezies"
          />
          <Restaurant_card 
            link="/consumer"
            image="https://lh3.googleusercontent.com/p/AF1QipM9C4-VklY3hzaxGb_h4M3wDVhwh5KIpN_Ozv1k=s1360-w1360-h1020"
            title="Kebab Istanbul"
          />
          <Restaurant_card
            link="/consumer"
            image="https://lh3.googleusercontent.com/p/AF1QipMYiYNeAb--caulTsF8hGu80VCm7Lh1lt53HbUC=s1360-w1360-h1020"
            title="Aladdin Ravezies"
          />
          <Restaurant_card 
            link="/consumer"
            image="https://lh3.googleusercontent.com/p/AF1QipM9C4-VklY3hzaxGb_h4M3wDVhwh5KIpN_Ozv1k=s1360-w1360-h1020"
            title="Kebab Istanbul"
          />
          <Restaurant_card
            link="/consumer"
            image="https://lh3.googleusercontent.com/p/AF1QipMYiYNeAb--caulTsF8hGu80VCm7Lh1lt53HbUC=s1360-w1360-h1020"
            title="Aladdin Ravezies"
          />
          <Restaurant_card 
            link="/consumer"
            image="https://lh3.googleusercontent.com/p/AF1QipM9C4-VklY3hzaxGb_h4M3wDVhwh5KIpN_Ozv1k=s1360-w1360-h1020"
            title="Kebab Istanbul"
          />
          <Restaurant_card
            link="/consumer"
            image="https://lh3.googleusercontent.com/p/AF1QipMYiYNeAb--caulTsF8hGu80VCm7Lh1lt53HbUC=s1360-w1360-h1020"
            title="Aladdin Ravezies"
          />
          <Restaurant_card 
            link="/consumer"
            image="https://lh3.googleusercontent.com/p/AF1QipM9C4-VklY3hzaxGb_h4M3wDVhwh5KIpN_Ozv1k=s1360-w1360-h1020"
            title="Kebab Istanbul"
          />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default consumer;