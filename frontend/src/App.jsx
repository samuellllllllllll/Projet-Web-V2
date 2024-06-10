import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Consumer from "./pages/consumer.jsx"
import Deliveryman from "./pages/deliveryman.jsx"
import Restaurant from "./pages/restaurant.jsx"
import Login from './pages/login_signin.jsx';
import MenuEdit from './pages/menuEdit.jsx';
import DeliverymanOrder from './pages/deliverymanOrder.jsx';
import DeliverymanOrder2 from './pages/deliverymanOrder2.jsx';
import DeliverymanOrder3 from './pages/deliverymanOrder3.jsx';

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
        <Route path="/deliverymanOrder2" element={<DeliverymanOrder2 />} />
        <Route path="/deliverymanOrder3" element={<DeliverymanOrder3 />} />
      </Routes>
    </Router>
  )
}

export default App