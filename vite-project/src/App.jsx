import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Consumer from "./pages/consumer.jsx"
import Deliveryman from "./pages/deliveryman.jsx"
import Restaurant from "./pages/restaurant.jsx"
import Login from './pages/Login.jsx';

const App = () => {
  return (
    <main className='bg-slate-300/20 h-full'>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/deliveryman" element={<Deliveryman />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/consumer" element={<Consumer />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App