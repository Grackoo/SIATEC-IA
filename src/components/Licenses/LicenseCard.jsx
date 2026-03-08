import React from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ImageCarousel from '../Shop/ImageCarousel';

export default function LicenseCard({ product }) {
    const { addItem } = useCart();

    const handleAddToCart = () => {
        addItem(product);
    };

    // Helper to get features list from specs if available
    // Check if specsRaw exists and has features array, otherwise default to empty
    const features = product.specsRaw?.features || [];
    const type = product.specsRaw?.condition || product.specsRaw?.type || 'Software';
    const description = product.specsRaw?.description || product.category;

    return (
        <div className="license-card">
            {/* Image Carousel */}
            <div className="relative">
                <ImageCarousel images={product.images} alt={product.name} />

                {/* Promotions Badge */}
                {product.is_promotion && product.discount_percentage && (
                    <div className="promotion-badge">
                        ¡{product.discount_percentage}% OFF!
                    </div>
                )}

                {/* Price Pill Overlay */}
                <div className="price-overlay !bottom-2 !right-0">
                    {product.is_promotion && product.discount_percentage ? (
                        <>
                            <span className="price-old">${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            <span className="price-new">${(product.price * (1 - product.discount_percentage / 100)).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </>
                    ) : (
                        <span className="price-new">${product.price ? product.price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}</span>
                    )}
                </div>
            </div>

            {/* License Info */}
            <div className="license-content">
                <div className="license-type-badge">
                    <span className="badge badge-primary">{type}</span>
                </div>

                <h3 className="license-name">{product.name}</h3>
                <p className="license-description text-sm text-gray-400 mb-2">
                    {description}
                </p>

                {/* Features */}
                {features.length > 0 && (
                    <ul className="license-features">
                        {features.slice(0, 3).map((feature, index) => (
                            <li key={index}>
                                <Check size={18} className="check-icon" />
                                <span className="text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Action - Hide Original Price Here since we show it overlaid */}
                <div className="license-footer mt-auto pt-4">
                    <button onClick={handleAddToCart} className="btn btn-primary text-sm px-3 py-2 w-full justify-center flex items-center gap-2">
                        <ShoppingCart size={18} />
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
}
