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
            <div className="product-card group relative flex flex-col h-full cursor-pointer hover:shadow-cyan-500/20 transition-all bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/5" onClick={() => setIsModalOpen(true)}>
                {/* Image Section - Transparent Background by default */}
                <div className="relative pt-8 pb-8 px-4 flex justify-center items-center">
                    <div className="w-full max-w-[220px] h-[140px] flex items-center justify-center">
                        <ImageCarousel images={product.images} alt={product.name} />
                    </div>

                    {/* Promotions Badge */}
                    {product.is_promotion && product.discount_percentage && (
                        <div className="absolute top-3 right-3 bg-[#f97316] text-white font-bold px-3 py-1 rounded-full shadow-lg z-10 text-[11px] tracking-wider">
                            ¡{product.discount_percentage}% OFF!
                        </div>
                    )}

                    {/* Price Pill Overlay */}
                    <div className="absolute -bottom-4 right-0 bg-black/90 px-3 py-1.5 rounded-l-lg shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center gap-2 z-10 border border-white/10 border-r-0 backdrop-blur-sm">
                        {product.is_promotion && product.discount_percentage ? (
                            <>
                                <span className="text-xs text-gray-500 line-through">${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                <span className="text-sm sm:text-base font-bold text-white">${(product.price * (1 - product.discount_percentage / 100)).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </>
                        ) : (
                            <span className="text-sm sm:text-base font-bold text-white">${product.price ? product.price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}</span>
                        )}
                    </div>
                </div>

                {/* Condition Badge - Solo la mantendremos si quieres, pero se ocultó en los mocks, la podemos dejar flotando a la izq */}
                {product.category === 'laptop' && product.condition && (
                    <div className="absolute top-3 left-3 z-10">
                        <span className="bg-gray-800/80 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded">
                            {product.condition}
                        </span>
                    </div>
                )}

                {/* Product Info */}
                <div className="flex-1 flex flex-col p-5 pt-8">
                    <h3 className="text-lg font-bold text-white mb-1 leading-tight line-clamp-2">{product.name}</h3>
                    <p className="text-[11px] text-gray-400 mb-4">(Haz clic en la imagen para más detalles)</p>

                    {/* Specific Laptop Specs - Plain Text without icons */}
                    {product.category === 'laptop' && product.specsRaw ? (
                        <div className="flex flex-col gap-1 mb-6 text-[13px] text-gray-300">
                            {product.specsRaw.gama && <div>Gama {product.specsRaw.gama}</div>}
                            {product.specsRaw.procesador && <div>Procesador: {product.specsRaw.procesador}</div>}
                            {product.specsRaw.ram && <div>Ram: {product.specsRaw.ram}</div>}
                            {product.specsRaw.almacenamiento && <div>Almacenamiento: {product.specsRaw.almacenamiento}</div>}
                        </div>
                    ) : (
                        product.specs && (
                            <div className="mb-6 text-[13px] text-gray-300 line-clamp-4">
                                {product.specs}
                            </div>
                        )
                    )}

                    <div className="mt-auto flex flex-col gap-4">
                        <span className="text-[13px] text-gray-400">Stock: {product.stock || 0}</span>

                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevenir que se abra el modal
                                handleAddToCart();
                            }}
                            className="bg-[#009EDB] hover:bg-[#0084B8] text-white w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors text-[15px]"
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

