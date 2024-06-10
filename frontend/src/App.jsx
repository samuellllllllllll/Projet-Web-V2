import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Consumer from "./pages/consumer/consumer.jsx";
import Deliveryman from "./pages/deliveryman.jsx";
import Restaurant from "./pages/restaurant.jsx";
import Login from './pages/login_signin.jsx';
import AccountConsumer from './pages/consumer/account.jsx';
import ShoppingBasket from './pages/consumer/shopping_basket.jsx';
import MenuEdit from './pages/menuEdit.jsx';
import AuthenticationProcess from './pages/authenticationProcess.jsx';
import { AuthProvider } from './authContext.jsx';

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
          <Route path="/menuEdit" element={<MenuEdit />} />
          <Route path="/authenticated" element={<AuthenticationProcess />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
