import React from 'react';
import { Play, Music } from 'lucide-react';
import { requestStreamingService } from '../utils/whatsapp';

export default function Streaming() {
    const services = [
        {
            id: 'netflix',
            name: 'Netflix',
            icon: <span className="service-icon-text">N</span>,
            description: 'Películas, series y documentales ilimitados.',
            headerClass: 'service-netflix'
        },
        {
            id: 'vix',
            name: 'ViX+',
            icon: <span className="service-icon-text">ViX+</span>,
            description: 'El servicio de streaming en español más grande del mundo.',
            headerClass: 'service-vix'
        },
        {
            id: 'paramount',
            name: 'Paramount+',
            icon: <span className="service-icon-text">Paramount+</span>,
            description: 'Una montaña de entretenimiento.',
            headerClass: 'service-paramount'
        },
        {
            id: 'hbo',
            name: 'HBO Max',
            icon: <span className="service-icon-text">HBO MAX</span>,
            description: 'Todo lo que amas, todo en un solo lugar.',
            headerClass: 'service-hbo'
        },
        {
            id: 'spotify',
            name: 'Spotify Premium',
            icon: <Music size={48} />,
            description: 'Música sin anuncios, modo offline y más.',
            headerClass: 'service-spotify'
        },
        {
            id: 'disney',
            name: 'Disney+',
            icon: <span className="service-icon-text">Disney+</span>,
            description: 'Las mejores historias de Disney, Pixar, Marvel y más.',
            headerClass: 'service-disney'
        }
    ];

    return (
        <div className="streaming-page section">
            <div className="container">
                <header className="streaming-header">
                    <h1>Cuentas de Streaming</h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                        Disfruta del mejor entretenimiento con nuestras cuentas premium garantizadas.
                        <br />
                        <span style={{ color: '#2563EB', fontWeight: 600 }}>Solicita la tuya directamente por WhatsApp.</span>
                    </p>
                </header>

                <div className="streaming-grid">
                    {services.map((service) => (
                        <div key={service.id} className="service-card">
                            <div className={`service-header ${service.headerClass}`}>
                                {service.icon}
                            </div>
                            <div className="service-body">
                                <h3 className="service-title">{service.name}</h3>
                                <p className="service-description">{service.description}</p>
                                <button
                                    onClick={() => requestStreamingService(service.name)}
                                    className="btn btn-whatsapp"
                                >
                                    <Play size={18} fill="currentColor" />
                                    <span>Solicitar Cuenta</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="guarantee-section">
                    <h2 className="text-center" style={{ marginBottom: '2rem' }}>¿Por qué elegir nuestro servicio?</h2>
                    <div className="guarantee-grid">
                        <div className="guarantee-item">
                            <div className="guarantee-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="guarantee-title">Garantía Total</h3>
                            <p className="guarantee-text">Ofrecemos soporte y reposición en caso de cualquier inconveniente durante tu suscripción.</p>
                        </div>
                        <div className="guarantee-item">
                            <div className="guarantee-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="guarantee-title">Entrega Inmediata</h3>
                            <p className="guarantee-text">Recibe tus accesos minutos después de confirmar tu pago vía WhatsApp.</p>
                        </div>
                        <div className="guarantee-item">
                            <div className="guarantee-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="guarantee-title">Precios Accesibles</h3>
                            <p className="guarantee-text">Disfruta de tus plataformas favoritas a una fracción del costo original.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
