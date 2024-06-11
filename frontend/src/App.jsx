import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Consumer from "./pages/consumer/consumer.jsx";
import Deliveryman from "./pages/deliveryman.jsx";
import Restaurant from "./pages/restaurant.jsx";
import Login from './pages/login_signin.jsx';
import AccountConsumer from './pages/consumer/account.jsx';
import ShoppingBasket from './pages/consumer/shopping_basket.jsx';
import MenuEdit from './pages/menuEdit.jsx';
import DeliverymanOrder from './pages/deliverymanOrder.jsx';
import DeliverymanOrder2 from './pages/deliverymanOrder2.jsx';
import DeliverymanOrder3 from './pages/deliverymanOrder3.jsx';
import Restaurant_page from './components/Restaurant_page.jsx';
import AuthenticationProcess from './pages/authenticationProcess.jsx';
import { AuthProvider } from './authContext.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/livreur" element={<Deliveryman />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/consommateur" element={<Consumer />} />
        <Route path="/consommateur/compte" element={<AccountConsumer />} />
        <Route path="/consommateur/panier" element={<ShoppingBasket />} />
        <Route path="/consommateur/page_restaurant" element={<Restaurant_page />} />
        <Route path="/menuEdit" element={<MenuEdit />} />
        <Route path="/deliverymanOrder" element={<DeliverymanOrder />} />
        <Route path="/deliverymanOrder2" element={<DeliverymanOrder2 />} />
        <Route path="/deliverymanOrder3" element={<DeliverymanOrder3 />} />
        <Route path="/authenticated" element={<AuthenticationProcess />} />
      </Routes>
    </Router>
  )
}

export default App;
