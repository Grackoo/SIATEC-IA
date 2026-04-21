import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { sendOrderToWhatsApp } from '../../utils/whatsapp';

export default function ShoppingCart() {
    const { cart, removeItem, updateQuantity, clearCart, getTotal, isCartOpen, setIsCartOpen } = useCart();

    if (!isCartOpen) return null;

    const total = getTotal();

    const handleCheckout = () => {
        if (cart.length === 0) return;
        sendOrderToWhatsApp(cart, total);
    };

    return (
        <>
            <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
            <div className="cart-sidebar">
                {/* Header */}
                <div className="cart-header">
                    <div className="cart-header-title">
                        <ShoppingBag size={24} />
                        <h2>Tu Carrito</h2>
                    </div>
                    <button onClick={() => setIsCartOpen(false)} className="btn btn-icon">
                        <X size={24} />
                    </button>
                </div>

                {/* Cart Content */}
                <div className="cart-content">
                    {cart.length === 0 ? (
                        <div className="cart-empty">
                            <ShoppingBag size={64} className="cart-empty-icon" />
                            <p>Tu carrito está vacío</p>
                            <button onClick={() => setIsCartOpen(false)} className="btn btn-primary">
                                Explorar Productos
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Cart Items */}
                            <div className="cart-items">
                                {cart.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        {item.images && item.images[0] && (
                                            <img src={item.images[0]} alt={item.name} className="cart-item-image" />
                                        )}
                                        <div className="cart-item-details">
                                            <h4>{item.name}</h4>
                                            {item.condition && (
                                                <span className={`badge ${item.condition === 'Nueva' ? 'badge-success' : 'badge-primary'}`}>
                                                    {item.condition}
                                                </span>
                                            )}
                                            <p className="cart-item-price">${item.price.toLocaleString('es-MX')} MXN</p>

                                            {/* Quantity Controls */}
                                            <div className="quantity-controls">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="btn btn-icon btn-sm"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="quantity">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="btn btn-icon btn-sm"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="btn btn-icon btn-sm remove-btn"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Cart Footer */}
                            <div className="cart-footer">
                                <div className="cart-total">
                                    <span>Total</span>
                                    <span className="total-amount">${total.toLocaleString('es-MX')} MXN</span>
                                </div>
                                <button onClick={handleCheckout} className="btn btn-primary btn-block">
                                    Confirmar por WhatsApp
                                </button>
                                <button onClick={clearCart} className="btn btn-secondary btn-block">
                                    Vaciar Carrito
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

