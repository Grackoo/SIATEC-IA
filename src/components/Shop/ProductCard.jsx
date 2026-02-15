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
        <div className="product-card group relative">
            {/* Image Carousel */}
            <ImageCarousel images={product.images} alt={product.name} />

            {/* Condition Badge */}
            <div className="product-badge">
                <span className={`badge ${product.condition === 'Nueva' ? 'badge-success' : 'badge-primary'}`}>
                    {product.condition}
                </span>
            </div>

            {/* Specs Tooltip */}
            {product.specsRaw && typeof product.specsRaw === 'object' && (
                <div className="product-specs-tooltip absolute inset-0 bg-black/95 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center z-20 text-center pointer-events-none">
                    <h4 className="text-lg font-bold text-blue-400 mb-4 border-b border-blue-500/30 pb-2 w-full">Especificaciones</h4>
                    <div className="space-y-2 text-sm text-gray-300 w-full">
                        {Object.entries(product.specsRaw).map(([key, value]) => (
                            key !== 'condition' && (
                                <div key={key} className="flex justify-between border-b border-white/5 py-1">
                                    <span className="font-semibold capitalize text-gray-400">{key}:</span>
                                    <span>{value}</span>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}

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

