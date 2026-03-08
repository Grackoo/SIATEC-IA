import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { openCustomerSupport } from '../../utils/whatsapp';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const cartItemCount = getTotalItems();

  const navLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'licencias', label: 'Licencias' },
    { id: 'reparacion', label: 'Reparación' },
    { id: 'streaming', label: 'Streaming' },
  ];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // If we're not on the main page (e.g., admin), we might need to navigate first, 
      // but assuming the user is on the main page for these links.
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    } else {
      // If element not found, we might be on a different route like /gestion_interna. 
      // Fallback: window.location.hash = '/' then scroll, but for now just navigate to home
      window.location.hash = '#/';
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const isActive = (path) => false; // Disabled active styling for now

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            {/* Cambia "/logo.png" por "logo.png" o "./logo.png" */}
            <img src="logo.png" alt="SIA TEC" className="navbar-logo" />
            <div className="navbar-brand-text">
              <span className="navbar-title">SIA TEC</span>
              <span className="navbar-subtitle">Soluciones Informáticas</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-links desktop-only">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className="nav-link cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="navbar-actions">
            {/* WhatsApp Support Button - Removed */}
            {/* Cart Button - Removed */}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-icon mobile-only"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        <div className={`mobile-menu-backdrop ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <span className="mobile-menu-title">Menú de Navegación</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn btn-icon mobile-menu-close"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>

          <div className="mobile-nav-container">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="mobile-nav-link cursor-pointer"
                onClick={(e) => scrollToSection(e, link.id)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Footer - Removed */}
        </div>
      </div>
    </nav>
  );
}
