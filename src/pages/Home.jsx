import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Zap, CheckCircle, Tag } from 'lucide-react';
import ProductCard from '../components/Shop/ProductCard';
import { useProducts } from '../context/ProductsContext';

export default function Home() {
    const { products } = useProducts();

    // Filtramos los productos que están en promoción
    const promotionalProducts = products.filter(product => product.is_promotion);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="video-background">
                    <video autoPlay loop muted playsInline className="hero-video">
                        <source src="videos/hero-video.mp4" type="video/mp4" />
                        Tu navegador no soporta videos HTML5.
                    </video>
                    <div className="hero-overlay"></div>
                </div>
                <div className="container relative z-10">
                    <div className="hero-content text-white">
                        <h1 className="hero-title text-white drop-shadow-lg" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.8)' }}>
                            Soluciones Informáticas Avanzadas
                        </h1>
                        <p className="hero-subtitle text-white drop-shadow-md" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                            Venta y Reparación de Equipos de Cómputo con Garantía y Eficiencia
                        </p>
                        <div className="hero-buttons">
                            <button onClick={(e) => scrollToSection(e, 'laptops')} className="btn btn-glass btn-lg text-white border-white hover:bg-white hover:text-black" style={{ textShadow: 'none' }}>
                                <Laptop size={24} />
                                Explorar Laptops
                            </button>
                            <button onClick={(e) => scrollToSection(e, 'reparacion')} className="btn btn-glass btn-lg text-white border-white hover:bg-white hover:text-black" style={{ textShadow: 'none' }}>
                                Solicitar Reparación
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features section">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Laptop size={40} />
                            </div>
                            <h3>Laptops de Calidad</h3>
                            <p>Equipos nuevos y reacondicionados con garantía certificada</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Zap size={40} />
                            </div>
                            <h3>Reparación Experta</h3>
                            <p>Técnicos certificados para todo tipo de reparaciones</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <CheckCircle size={40} />
                            </div>
                            <h3>Licencias Originales</h3>
                            <p>Software original con soporte y actualizaciones</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Promotions Section */}
            {promotionalProducts.length > 0 && (
                <section id="promociones" className="products section bg-[#181818]">
                    <div className="container">
                        <div className="section-header">
                            <div className="flex items-center justify-center gap-3 mb-2">
                                <Tag className="text-red-500" size={32} />
                                <h2 className="section-title text-red-500 mb-0 !pb-0">Ofertas Especiales</h2>
                            </div>
                            <p className="section-description">
                                Aprovecha nuestros mejores descuentos por tiempo limitado
                            </p>
                        </div>
                        <div className="products-grid">
                            {promotionalProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Products Section */}
            <section id="laptops" className="products section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Nuestras Laptops</h2>
                        <p className="section-description">
                            Encuentra el equipo perfecto para tus necesidades
                        </p>
                    </div>
                    <div className="products-grid">
                        {products
                            .filter(product => product.category === 'laptop')
                            .map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta section">
                <div className="container">
                    <div className="cta-content">
                        <h2>¿No encuentras lo que buscas?</h2>
                        <p>Contáctanos y te ayudaremos a encontrar el equipo ideal</p>
                        <button onClick={() => window.open('https://wa.me/527713951347', '_blank')} className="btn btn-primary btn-lg">
                            Contactar por WhatsApp
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

