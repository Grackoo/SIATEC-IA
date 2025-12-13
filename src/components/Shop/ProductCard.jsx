import React from 'react';
import { ShoppingCart, Cpu, HardDrive } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ImageCarousel from './ImageCarousel';

export default function ProductCard({ product }) {
    const { addItem } = useCart();

    const handleAddToCart = () => {
        addItem(product);
    };

    return (
        <div className="product-card">
            {/* Image Carousel */}
            <ImageCarousel images={product.images} alt={product.name} />

            {/* Condition Badge */}
            <div className="product-badge">
                <span className={`badge ${product.condition === 'Nueva' ? 'badge-success' : 'badge-primary'}`}>
                    {product.condition}
                </span>
            </div>

            {/* Product Info */}
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>

                {product.specs && (
                    <div className="product-specs">
                        <Cpu size={16} />
                        <p>{product.specs}</p>
                    </div>
                )}

                <div className="product-footer">
                    <div className="product-price">
                        <span className="price-label">Precio</span>
                        <span className="price-value">${product.price.toLocaleString('es-MX')} MXN</span>
                    </div>

                    <button onClick={handleAddToCart} className="btn btn-primary">
                        <ShoppingCart size={20} />
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    );
}

