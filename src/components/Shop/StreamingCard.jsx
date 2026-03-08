import React from 'react';
import { Play, Music, Wifi } from 'lucide-react';
import { requestStreamingService } from '../../utils/whatsapp';

export default function StreamingCard({ service }) {
    return (
        <div className="service-card relative overflow-hidden group">
            {/* Promotions Badge */}
            {service.is_promotion && service.discount_percentage && (
                <div className="promotion-badge">
                    ¡{service.discount_percentage}% OFF!
                </div>
            )}

            <div className={`service-header ${service.headerClass} ${service.hasImage ? '!p-0 overflow-hidden relative' : ''}`}>
                {service.icon}

                {/* Price Pill Overlay */}
                {service.hasImage && (
                    <div className="price-overlay !bottom-4 !right-0 absolute">
                        {service.is_promotion && service.discount_percentage ? (
                            <>
                                <span className="price-old">${service.price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                <span className="price-new">${(service.price * (1 - service.discount_percentage / 100)).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </>
                        ) : (
                            <span className="price-new">${service.price ? service.price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}</span>
                        )}
                    </div>
                )}
            </div>

            <div className="service-body">
                <h3 className="service-title">{service.name}</h3>
                <p className="service-description">{service.description}</p>

                {/* Price for non-image templates */}
                {!service.hasImage && service.price > 0 && (
                    <div className="flex items-center gap-2 mb-2">
                        {service.is_promotion && service.discount_percentage ? (
                            <>
                                <span className="text-sm text-gray-400 line-through">${service.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                                <span className="text-xl font-bold text-cyan-400">${(service.price * (1 - service.discount_percentage / 100)).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                            </>
                        ) : (
                            <span className="text-xl font-bold mb-2">${service.price} MXN</span>
                        )}
                    </div>
                )}

                <button
                    onClick={() => requestStreamingService(service.name)}
                    className="btn btn-whatsapp w-full justify-center mt-auto"
                >
                    <Play size={18} fill="currentColor" />
                    <span>Solicitar Cuenta</span>
                </button>
            </div>
        </div>
    );
}
