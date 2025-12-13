// src/App.jsx
import React from 'react';
// Cambia 'BrowserRouter' por 'HashRouter'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
// ... resto de imports

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        {/* Usamos HashRouter aquí */}
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