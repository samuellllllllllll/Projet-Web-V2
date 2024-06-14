import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Consumer from "./pages/consumer/consumer.jsx";
import Restaurant from "./pages/restaurant/restaurant.jsx";
import Login from './pages/login_signin.jsx';
import AccountConsumer from './pages/consumer/account.jsx';
import ShoppingBasket from './pages/consumer/shopping_basket.jsx';
import MenuEdit from './pages/restaurant/menuEdit.jsx';
import Deliveryman from './pages/deliveryman/deliveryman.jsx';
import DeliverymanOrder from './pages/deliveryman/deliverymanOrder.jsx';
import DeliverymanOrder2 from './pages/deliveryman/deliverymanOrder2.jsx';
import DeliverymanOrder3 from './pages/deliveryman/deliverymanOrder3.jsx';
import Restaurant_page from './components/Restaurant_page.jsx';
import AuthenticationProcess from './pages/authenticationProcess.jsx';
import { AuthProvider } from './authContext.jsx';
import DeliverymanAccount from './pages/deliveryman/account.jsx';
import RestaurantAccount from './pages/restaurant/accountRestaurant.jsx';

const App = () => {
  return (
    <AuthProvider>
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
          <Route path="/deliverymanAccount" element={<DeliverymanAccount />} />
          <Route path="/restaurantAccount" element={<RestaurantAccount />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
