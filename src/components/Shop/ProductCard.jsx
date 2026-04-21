import React, { useState } from 'react';
import { ShoppingCart, Cpu, HardDrive, Monitor, Zap, Info } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ImageCarousel from './ImageCarousel';
import ProductModal from './ProductModal';

export default function ProductCard({ product }) {
    const { addItem } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddToCart = () => {
        addItem(product);
    };

    return (
        <>
            <div className="product-card custom-design" onClick={() => setIsModalOpen(true)}>
                {/* Image Section - Transparent Background by default */}
                <div className="product-image-wrapper">
                    <div className="product-image-inner">
                        <ImageCarousel images={product.images} alt={product.name} />
                    </div>

                    {/* Promotions Badge */}
                    {product.is_promotion && product.discount_percentage && (
                        <div className="promotion-badge">
                            ¡{product.discount_percentage}% OFF!
                        </div>
                    )}

                    {/* Price Pill Overlay */}
                    <div className="price-overlay">
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

                {/* Condition Badge */}
                {product.category === 'laptop' && product.condition && (
                    <div className="condition-badge">
                        <span>{product.condition}</span>
                    </div>
                )}

                {/* Product Info */}
                <div className="product-info-plain">
                    <h3 className="product-name-plain">{product.name}</h3>
                    <p className="product-hint">(Haz clic en la imagen para más detalles)</p>

                    {/* Specific Laptop Specs - Plain Text without icons */}
                    {product.category === 'laptop' && product.specsRaw ? (
                        <div className="product-specs-list">
                            {product.specsRaw.gama && <div>Gama {product.specsRaw.gama}</div>}
                            {product.specsRaw.procesador && <div>Procesador: {product.specsRaw.procesador}</div>}
                            {product.specsRaw.ram && <div>Ram: {product.specsRaw.ram}</div>}
                            {product.specsRaw.almacenamiento && <div>Almacenamiento: {product.specsRaw.almacenamiento}</div>}
                        </div>
                    ) : (
                        product.specs && (
                            <div className="product-specs-text">
                                {product.specs}
                            </div>
                        )
                    )}

                    <div className="product-footer-plain">
                        <span className="product-stock">Stock: {product.stock || 0}</span>

                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevenir que se abra el modal
                                handleAddToCart();
                            }}
                            className="btn-add-cart"
                        >
                            <ShoppingCart size={18} />
                            Agregar
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <ProductModal product={product} onClose={() => setIsModalOpen(false)} />
            )}
        </>
    );
}

