import React from 'react';
import { X } from 'lucide-react';
import ImageCarousel from './ImageCarousel';

export default function ProductModal({ product, onClose }) {
    if (!product) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="modal-close-btn"
                >
                    <X size={24} />
                </button>

                {/* Top: Large Image Carousel */}
                <div className="modal-image-container">
                    <ImageCarousel images={product.images} alt={product.name} />
                </div>

                {/* Middle: Title */}
                <h2 className="modal-title">{product.name}</h2>

                {/* Bottom: Specs */}
                <div className="modal-specs-container">
                    <div className="modal-specs-list">
                        {product.category === 'laptop' && product.condition && (
                            <div>Condición: {product.condition}</div>
                        )}

                        {product.specsRaw && typeof product.specsRaw === 'object' ? (
                            Object.entries(product.specsRaw).map(([key, value]) => {
                                if (key === 'condition' || key === 'is_promotion' || key === 'discount_percentage') return null;
                                // Capitalize key properly if needed, but the screenshot just has them normally
                                // We'll just map them directly with the key capitalized
                                const formattedKey = key === 'ram' ? 'Ram' : key === 'gpu' ? 'GPU' : key.charAt(0).toUpperCase() + key.slice(1);
                                return (
                                    <div key={key}>
                                        {key === 'gama' ? `Gama ${value}` : `${formattedKey}: ${value}`}
                                    </div>
                                )
                            })
                        ) : (
                            <div className="modal-specs-empty">No hay especificaciones adicionales.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
