import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <h3 className="footer-title">SIA TEC</h3>
            <p className="footer-text">
              Soluciones Informáticas Avanzadas. Tu socio tecnológico de confianza.
            </p>
            <div className="footer-contact">
              <div className="contact-item">
                <Phone size={16} />
                <span>+52 771 395 1347</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>info@siatec.com</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Pachuca, Hidalgo, México</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Enlaces Rápidos</h4>
            <ul className="footer-links">
              <li><a href="/#laptops">Laptops</a></li>
              <li><a href="/licenses">Licencias</a></li>
              <li><a href="/appointment">Reparación</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4 className="footer-heading">Servicios</h4>
            <ul className="footer-links">
              <li>Venta de Laptops Nuevas</li>
              <li>Laptops Reacondicionadas</li>
              <li>Licencias de Software</li>
              <li>Reparación de Equipos</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} SIA TEC. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
