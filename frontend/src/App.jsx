import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Order1 from './pages/consumer/order1.jsx';
import Order2 from './pages/consumer/order2.jsx';
import OrderTracking from './pages/consumer/OrderTracking.jsx';
import ProtectedRoute from './privateRoutes.jsx';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/livreur" element={<ProtectedRoute element={Deliveryman} allowedRoles={['livreur']} />} />
          <Route path="/restaurant" element={<ProtectedRoute element={Restaurant} allowedRoles={['restaurant']} />} />
          <Route path="/consommateur" element={<ProtectedRoute element={Consumer} allowedRoles={['consumer']} />} />
          <Route path="/consommateur/compte" element={<ProtectedRoute element={AccountConsumer} allowedRoles={['consumer']} />} />
          <Route path="/consommateur/panier" element={<ProtectedRoute element={ShoppingBasket} allowedRoles={['consumer']} />} />
          <Route path="/consommateur/page_restaurant" element={<ProtectedRoute element={Restaurant_page} allowedRoles={['consumer']} />} />
          <Route path="/consommateur/suivi_commande" element={<ProtectedRoute element={OrderTracking} allowedRoles={['consumer']} />} />
          <Route path="/consommateur/commande1" element={<ProtectedRoute element={Order1} allowedRoles={['consumer']} />} />
          <Route path="/consommateur/commande2" element={<ProtectedRoute element={Order2} allowedRoles={['consumer']} />} />
          <Route path="/menuEdit" element={<ProtectedRoute element={MenuEdit} allowedRoles={['restaurant']} />} />
          <Route path="/deliverymanOrder" element={<ProtectedRoute element={DeliverymanOrder} allowedRoles={['livreur']} />} />
          <Route path="/deliverymanOrder2" element={<ProtectedRoute element={DeliverymanOrder2} allowedRoles={['livreur']} />} />
          <Route path="/deliverymanOrder3" element={<ProtectedRoute element={DeliverymanOrder3} allowedRoles={['livreur']} />} />
          <Route path="/authenticated" element={<ProtectedRoute element={AuthenticationProcess} allowedRoles={['consumer', 'restaurant', 'livreur']} />} />
          <Route path="/deliverymanAccount" element={<ProtectedRoute element={DeliverymanAccount} allowedRoles={['livreur']} />} />
          <Route path="/restaurantAccount" element={<ProtectedRoute element={RestaurantAccount} allowedRoles={['restaurant']} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
