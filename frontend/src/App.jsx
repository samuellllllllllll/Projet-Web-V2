import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Consumer from "./pages/consumer.jsx"
import Deliveryman from "./pages/deliveryman.jsx"
import Restaurant from "./pages/restaurant.jsx"
import Login from './pages/login_signin.jsx';
import MenuEdit from './pages/menuEdit.jsx';
import DeliverymanOrder from './pages/deliverymanOrder.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/deliveryman" element={<Deliveryman />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/consumer" element={<Consumer />} />
        <Route path="/menuEdit" element={<MenuEdit />} />
        <Route path="/deliverymanOrder" element={<DeliverymanOrder />} />
      </Routes>
    </Router>
  )
}

export default App