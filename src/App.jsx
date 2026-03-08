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
import FloatingActions from './components/Layout/FloatingActions';

// Importaciones de Páginas
import Home from './pages/Home';
import Licenses from './pages/Licenses';
import Appointment from './pages/Appointment';
import Streaming from './pages/Streaming';
import AdminDashboard from './pages/AdminDashboard'; // Import Admin Dashboard

// Estilos globales
import './index.css';

// Define a MainPage component that combines all sections
function MainPage() {
  return (
    <div className="single-page-wrapper">
      {/* Each section gets an ID so we can scroll to it */}
      <div id="inicio">
        <Home />
      </div>
      <div id="licencias" className="section-divider">
        <Licenses />
      </div>
      <div id="reparacion" className="section-divider">
        <Appointment />
      </div>
      <div id="streaming" className="section-divider">
        <Streaming />
      </div>
    </div>
  );
}

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main>
              <Routes>
                {/* Single unified page route */}
                <Route path="/" element={<MainPage />} />
                {/* Keep admin route separate */}
                <Route path="/gestion_interna" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
            <ShoppingCart />
            <FloatingActions />
          </div>
        </Router>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;