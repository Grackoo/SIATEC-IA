import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductsProvider } from './context/ProductsContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import ShoppingCart from './components/Cart/ShoppingCart';
import Home from './pages/Home';
import Licenses from './pages/Licenses';
import Appointment from './pages/Appointment';
import './index.css';

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/licenses" element={<Licenses />} />
                <Route path="/appointment" element={<Appointment />} />
              </Routes>
            </main>
            <Footer />
            <ShoppingCart />
          </div>
        </Router>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
