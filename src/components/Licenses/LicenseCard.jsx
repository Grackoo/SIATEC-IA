import React from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function LicenseCard({ product }) {
    const { addItem } = useCart();

    const handleAddToCart = () => {
        addItem(product);
    };

    // Helper to get image
    const image = product.images && product.images.length > 0 ? product.images[0] : product.image_url;

    // Helper to get features list from specs if available
    // Check if specsRaw exists and has features array, otherwise default to empty
    const features = product.specsRaw?.features || [];
    const type = product.specsRaw?.type || 'Software';
    const description = product.specsRaw?.description || product.category;

    return (
        <div className="license-card">
            {/* License Image */}
            <div className="license-image-container">
                <img src={image || 'https://via.placeholder.com/300?text=Software'} alt={product.name} className="license-image" />
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

                {/* Price and Action */}
                <div className="license-footer mt-auto">
                    <div className="license-price">
                        <span className="price-value">${product.price.toLocaleString('es-MX')}</span>
                        <span className="price-currency">MXN</span>
                    </div>
                    <button onClick={handleAddToCart} className="btn btn-primary text-sm px-3 py-2">
                        <ShoppingCart size={18} />
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    );
}
