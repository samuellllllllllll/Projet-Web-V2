import { BrowserRouter, Routes, Route } from "react-router-dom"
import Consumer from "./pages/consumer.jsx"
import Deliveryman from "./pages/deliveryman.jsx"
import Restaurant from "./pages/restaurant.jsx"

export default function App{
    return (
        <div>
        <BrowserRouter>
            <Routes>
                <Route path="/consumer" element={<Consumer />} />
                <Route path="/deliveryman" element={<Deliveryman />} />
                <Route path="/restaurant" element={<Restaurant />} />
            </Routes>
        </BrowserRouter>
        </div>
    )
}