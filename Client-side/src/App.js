import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header";
import Home from './pages/Home';
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import Payment from "./pages/Payment";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels/:firstName/:email/:checkIn/:location/:adults/:phone" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetail />} />
        <Route path="/payment/:id/:price" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;