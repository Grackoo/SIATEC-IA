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
    { path: '/', label: 'Inicio' },
    { path: '/licenses', label: 'Licencias' },
    { path: '/appointment', label: 'Reparación' },
    { path: '/streaming', label: 'Streaming' },
    { path: '/admin', label: 'Admin' },
  ];

  const isActive = (path) => location.pathname === path;

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
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="navbar-actions">
            {/* WhatsApp Support Button */}
            <button
              onClick={openCustomerSupport}
              className="btn btn-sm whatsapp-btn"
              title="Atención al Cliente"
            >
              <MessageCircle size={20} />
              <span className="desktop-only-inline">Soporte</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn btn-icon cart-btn"
              title="Ver Carrito"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>

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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
