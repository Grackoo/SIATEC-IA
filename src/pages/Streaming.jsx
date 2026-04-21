import React, { useEffect, useState } from 'react';
import { Play, Music, Wifi } from 'lucide-react';
import { requestStreamingService } from '../utils/whatsapp';
import { useSheets } from '../context/SheetsContext';
import StreamingCard from '../components/Shop/StreamingCard';

export default function Streaming() {
    const { inventory } = useSheets();
    const [streamingServices, setStreamingServices] = useState([]);

    // UI Configuration (Templates)
    const serviceTemplates = {
        'netflix': { icon: <span className="service-icon-text">N</span>, headerClass: 'service-netflix' },
        'vix': { icon: <span className="service-icon-text">ViX+</span>, headerClass: 'service-vix' },
        'paramount': { icon: <span className="service-icon-text">Paramount+</span>, headerClass: 'service-paramount' },
        'hbo': { icon: <span className="service-icon-text">HBO MAX</span>, headerClass: 'service-hbo' },
        'spotify': { icon: <Music size={48} />, headerClass: 'service-spotify' },
        'disney': { icon: <span className="service-icon-text">Disney+</span>, headerClass: 'service-disney' }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const formatImageUrl = (url) => {
        if (!url) return '';
        if (url.includes('drive.google.com/uc')) {
            try {
                const urlParams = new URLSearchParams(url.split('?')[1]);
                const id = urlParams.get('id');
                if (id) {
                    return `https://drive.google.com/thumbnail?id=${id}&sz=w400`;
                }
            } catch (e) {
                return url;
            }
        }
        return url;
    };

    useEffect(() => {
        // Filter inventory for streaming category
        const dbServices = inventory.filter(item => item.category === 'streaming');

        if (dbServices.length > 0) {
            // Map DB items to UI structure
            const mappedServices = dbServices.map(item => {
                // Try to match with template by checking if title contains key (case insensitive)
                const templateKey = Object.keys(serviceTemplates).find(key =>
                    item.title.toLowerCase().includes(key)
                );

                const template = templateKey ? serviceTemplates[templateKey] : {
                    icon: <Wifi size={48} />,
                    headerClass: 'bg-gray-800' // Default style
                };

                const hasImage = !!item.image_url;

                return {
                    id: item.id,
                    name: item.title,
                    icon: hasImage ? <img src={formatImageUrl(item.image_url)} alt={item.title} className="w-full h-full object-cover" /> : template.icon,
                    description: item.specs?.description || 'Servicio de streaming premium.',
                    headerClass: hasImage ? 'bg-[#121212]' : template.headerClass,
                    price: item.price,
                    hasImage,
                    is_promotion: item.specs?.is_promotion || false,
                    discount_percentage: item.specs?.discount_percentage || null
                };
            });
            setStreamingServices(mappedServices);
        } else {
            // Fallback for demo if DB is empty
            setStreamingServices([
                { id: 'demo1', name: 'Netflix (Demo)', icon: serviceTemplates['netflix'].icon, description: 'Ejemplo (Base de datos vacía)', headerClass: serviceTemplates['netflix'].headerClass },
                { id: 'demo2', name: 'Disney+ (Demo)', icon: serviceTemplates['disney'].icon, description: 'Ejemplo (Base de datos vacía)', headerClass: serviceTemplates['disney'].headerClass }
            ]);
        }
    }, [inventory]);

    return (
        <div className="streaming-page section">
            <div className="container">
                <header className="streaming-header" data-aos="fade-up">
                    <h1>Cuentas de Streaming</h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                        Disfruta del mejor entretenimiento con nuestras cuentas premium garantizadas.
                        <br />
                        <span style={{ color: '#2563EB', fontWeight: 600 }}>Solicita la tuya directamente por WhatsApp.</span>
                    </p>
                </header>

                <div className="streaming-grid">
                    {streamingServices.map((service, index) => (
                        <div key={service.id} data-aos="fade-up" data-aos-delay={index * 100}>
                            <StreamingCard service={service} />
                        </div>
                    ))}
                </div>

                <div className="guarantee-section">
                    <h2 className="text-center" style={{ marginBottom: '2rem' }} data-aos="fade-up">¿Por qué elegir nuestro servicio?</h2>
                    <div className="guarantee-grid">
                        <div className="guarantee-item" data-aos="fade-up" data-aos-delay="100">
                            <div className="guarantee-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="guarantee-title">Garantía Total</h3>
                            <p className="guarantee-text">Ofrecemos soporte y reposición en caso de cualquier inconveniente durante tu suscripción.</p>
                        </div>
                        <div className="guarantee-item" data-aos="fade-up" data-aos-delay="200">
                            <div className="guarantee-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="guarantee-title">Entrega Inmediata</h3>
                            <p className="guarantee-text">Recibe tus accesos minutos después de confirmar tu pago vía WhatsApp.</p>
                        </div>
                        <div className="guarantee-item" data-aos="fade-up" data-aos-delay="300">
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
