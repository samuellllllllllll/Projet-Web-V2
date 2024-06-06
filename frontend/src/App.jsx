import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Consumer from "./pages/consumer/consumer.jsx"
import Deliveryman from "./pages/deliveryman.jsx"
import Restaurant from "./pages/restaurant.jsx"
import Login from './pages/login_signin.jsx';
<<<<<<< HEAD
import AccountConsumer from './pages/consumer/account.jsx';
import ShoppingBasket from './pages/consumer/shopping_basket.jsx';
=======
import MenuEdit from './pages/menuEdit.jsx';
>>>>>>> 4bc8f8ce77a5f432b2d3b7b10588abf1ed16e4a0

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/livreur" element={<Deliveryman />} />
        <Route path="/restaurant" element={<Restaurant />} />
<<<<<<< HEAD
        <Route path="/consommateur" element={<Consumer />} />
        <Route path="/consommateur/compte" element={<AccountConsumer />} />
        <Route path="/consommateur/panier" element={<ShoppingBasket />} />
=======
        <Route path="/consumer" element={<Consumer />} />
        <Route path="/menuEdit" element={<MenuEdit />} />
>>>>>>> 4bc8f8ce77a5f432b2d3b7b10588abf1ed16e4a0
      </Routes>
    </Router>
  )
}

export default App