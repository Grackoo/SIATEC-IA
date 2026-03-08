import React from 'react';
import { X } from 'lucide-react';
import ImageCarousel from './ImageCarousel';

export default function ProductModal({ product, onClose }) {
    if (!product) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            <div className="bg-[#121212] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col md:flex-row shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-red-500/80 rounded-full text-white transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Left: Images */}
                <div className="w-full md:w-1/2 p-4 md:p-6 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center">
                    <div className="rounded-xl overflow-hidden shadow-lg border border-white/5">
                        <ImageCarousel images={product.images} alt={product.name} />
                    </div>
                </div>

                {/* Right: Details & Specs */}
                <div className="w-full md:w-1/2 p-6 md:p-8 space-y-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{product.name}</h2>

                        {/* Price Display similar to ProductCard */}
                        <div className="flex items-end gap-3 mb-4 mt-4">
                            {product.is_promotion && product.discount_percentage ? (
                                <>
                                    <span className="text-3xl font-bold text-cyan-400">
                                        ${(product.price * (1 - product.discount_percentage / 100)).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                                    </span>
                                    <span className="text-lg text-gray-500 line-through mb-1">
                                        ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                    </span>
                                </>
                            ) : (
                                <span className="text-3xl font-bold text-cyan-400">
                                    ${product.price ? product.price.toLocaleString('es-MX', { minimumFractionDigits: 2 }) : '0'} MXN
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-cyan-500 border-b border-white/10 pb-2">Especificaciones Técnicas</h3>
                        <div className="grid grid-cols-1 gap-3 text-sm">
                            {product.category === 'laptop' && product.condition && (
                                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                    <span className="text-gray-400">Condición</span>
                                    <span className="text-white font-medium">{product.condition}</span>
                                </div>
                            )}

                            {product.specsRaw && typeof product.specsRaw === 'object' ? (
                                Object.entries(product.specsRaw).map(([key, value]) => {
                                    if (key === 'condition' || key === 'is_promotion' || key === 'discount_percentage') return null; // Already handled
                                    return (
                                        <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                            <span className="text-gray-400 capitalize">{key}</span>
                                            <span className="text-white font-medium text-right max-w-[60%] truncate" title={String(value)}>
                                                {value}
                                            </span>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="text-gray-500 italic p-3 text-center">No hay especificaciones adicionales.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
