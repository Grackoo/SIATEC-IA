import React from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function LicenseCard({ license }) {
    const { addItem } = useCart();

    const handleAddToCart = () => {
        addItem(license);
    };

    return (
        <div className="license-card">
            {/* License Image */}
            {license.image && (
                <div className="license-image-container">
                    <img src={license.image} alt={license.name} className="license-image" />
                </div>
            )}

            {/* License Info */}
            <div className="license-content">
                <div className="license-type-badge">
                    <span className="badge badge-primary">{license.type}</span>
                </div>

                <h3 className="license-name">{license.name}</h3>
                <p className="license-description">{license.description}</p>

                {/* Features */}
                {license.features && license.features.length > 0 && (
                    <ul className="license-features">
                        {license.features.map((feature, index) => (
                            <li key={index}>
                                <Check size={18} className="check-icon" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Price and Action */}
                <div className="license-footer">
                    <div className="license-price">
                        <span className="price-value">${license.price.toLocaleString('es-MX')}</span>
                        <span className="price-currency">MXN</span>
                    </div>
                    <button onClick={handleAddToCart} className="btn btn-primary">
                        <ShoppingCart size={20} />
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
}

