import React from 'react';
import { MessageCircle, ShoppingCart } from 'lucide-react';
import { openCustomerSupport } from '../../utils/whatsapp';
import { useCart } from '../../context/CartContext';

export default function FloatingActions() {
    const { setIsCartOpen, getTotalItems } = useCart();
    const cartItemCount = getTotalItems();

    return (
        <div className="floating-actions-container">
            {/* WhatsApp Support Button */}
            <button
                onClick={openCustomerSupport}
                className="floating-btn floating-btn-whatsapp"
                title="Soporte por WhatsApp"
            >
                <MessageCircle size={28} />
            </button>

            {/* Shopping Cart Button */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="floating-btn floating-btn-cart"
                title="Carrito de Compras"
            >
                <div className="relative flex items-center justify-center">
                    <ShoppingCart size={28} />
                    {cartItemCount > 0 && (
                        <span className="floating-cart-badge">{cartItemCount}</span>
                    )}
                </div>
            </button>
        </div>
    );
}
