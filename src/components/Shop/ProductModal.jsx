import React from 'react';
import { X } from 'lucide-react';
import ImageCarousel from './ImageCarousel';

export default function ProductModal({ product, onClose }) {
    if (!product) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            <div className="bg-[#1a1a1a] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl flex flex-col items-center p-6 sm:p-10 border border-white/5">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Top: Large Image Carousel */}
                <div className="w-full max-w-md mb-8">
                    <ImageCarousel images={product.images} alt={product.name} />
                </div>

                {/* Middle: Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">{product.name}</h2>

                {/* Bottom: Specs */}
                <div className="w-full max-w-lg">
                    <div className="flex flex-col gap-1.5 text-[13px] text-gray-300">
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
                            <div className="text-gray-500 italic">No hay especificaciones adicionales.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
