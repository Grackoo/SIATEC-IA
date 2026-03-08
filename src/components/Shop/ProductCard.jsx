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
            <div className="product-card group relative flex flex-col h-full cursor-pointer hover:shadow-cyan-500/20 transition-shadow" onClick={() => setIsModalOpen(true)}>
                {/* Image Section */}
                <div className="relative">
                    <ImageCarousel images={product.images} alt={product.name} />

                    {/* Promotions Badge */}
                    {product.is_promotion && product.discount_percentage && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white font-bold px-3 py-1 rounded-full shadow-lg z-10 text-sm transform rotate-3">
                            ¡{product.discount_percentage}% OFF!
                        </div>
                    )}
                </div>

                {/* Condition Badge - Only for Laptops */}
                {product.category === 'laptop' && (
                    <div className="product-badge">
                        <span className="badge-laptop">
                            {product.condition || 'Reacondicionada'}
                        </span>
                    </div>
                )}

                {/* Product Info */}
                <div className="product-info flex-1 flex flex-col">
                    <h3 className="product-name mb-1 line-clamp-2">{product.name}</h3>
                    <div className="text-[10px] text-cyan-400 mb-3 flex items-center gap-1 opacity-80">
                        <Info size={12} />
                        <span>Haz clic en la imagen para más detalles</span>
                    </div>

                    {/* Specific Laptop Specs */}
                    {product.category === 'laptop' && product.specsRaw ? (
                        <div className="product-specs flex-col gap-1.5 mb-4">
                            {product.specsRaw.gama && (
                                <div className="flex items-center gap-2 text-xs text-gray-300">
                                    <Zap size={14} className="text-yellow-500" />
                                    <span>Gama {product.specsRaw.gama}</span>
                                </div>
                            )}
                            {product.specsRaw.procesador && (
                                <div className="flex items-center gap-2 text-xs text-gray-300">
                                    <Cpu size={14} className="text-blue-400" />
                                    <span className="truncate">{product.specsRaw.procesador}</span>
                                </div>
                            )}
                            {product.specsRaw.ram && (
                                <div className="flex items-center gap-2 text-xs text-gray-300">
                                    <HardDrive size={14} className="text-green-400" />
                                    <span>{product.specsRaw.ram} RAM</span>
                                </div>
                            )}
                            {product.specsRaw.almacenamiento && (
                                <div className="flex items-center gap-2 text-xs text-gray-300">
                                    <HardDrive size={14} className="text-purple-400" />
                                    <span className="truncate">{product.specsRaw.almacenamiento}</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        product.specs && (
                            <div className="product-specs mb-4 line-clamp-2">
                                <p>{product.specs}</p>
                            </div>
                        )
                    )}

                    <div className="product-footer mt-auto pt-4 border-t border-white/10 flex flex-row justify-between items-end">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Precio</span>
                            {product.is_promotion && product.discount_percentage ? (
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 line-through">${product.price.toLocaleString('es-MX')}</span>
                                    <span className="text-lg sm:text-xl font-bold text-cyan-400">
                                        ${(product.price * (1 - product.discount_percentage / 100)).toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} MXN
                                    </span>
                                </div>
                            ) : (
                                <span className="text-lg sm:text-xl font-bold text-cyan-400">
                                    ${product.price.toLocaleString('es-MX')} MXN
                                </span>
                            )}
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevenir que se abra el modal
                                handleAddToCart();
                            }}
                            className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors text-sm"
                        >
                            <ShoppingCart size={16} />
                            <span className="hidden sm:inline">Agregar</span>
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

