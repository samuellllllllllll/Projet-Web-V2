import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Consumer from "./pages/consumer/consumer.jsx"
import Deliveryman from "./pages/deliveryman.jsx"
import Restaurant from "./pages/restaurant.jsx"
import Login from './pages/login_signin.jsx';
import AccountConsumer from './pages/consumer/account.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/deliveryman" element={<Deliveryman />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/consumer" element={<Consumer />} />
        <Route path="/consumer/account" element={<AccountConsumer />} />
      </Routes>
    </Router>
  )
}

export default App