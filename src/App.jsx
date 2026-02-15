import React from 'react';
// Usamos HashRouter para compatibilidad con GitHub Pages
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Importaciones de Contexto
import { CartProvider } from './context/CartContext';
import { ProductsProvider } from './context/ProductsContext'; // <-- Esta es la que te faltaba y causaba el error

// Importaciones de Componentes de Diseño
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import ShoppingCart from './components/Cart/ShoppingCart';

// Importaciones de Páginas
import Home from './pages/Home';
import Licenses from './pages/Licenses';
import Appointment from './pages/Appointment';
import Streaming from './pages/Streaming';
import AdminDashboard from './pages/AdminDashboard'; // Import Admin Dashboard

// Estilos globales
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
                <Route path="/streaming" element={<Streaming />} />
                <Route path="/admin" element={<AdminDashboard />} />
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