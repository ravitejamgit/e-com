import { useState } from "react";
import React from "react";
import { getAllCartItems, updateItemQuantity, deleteItem, payment } from "../../services/CartService";
import '../../styles/CartModal.css';
import { useNavigate } from 'react-router-dom';

// ── Inline SVG Icons (no external dependency) ──────────────
const IconCart = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

const IconTrash = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
);

const IconBox = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
);

const IconEmptyCart = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#adb5bd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        <line x1="4" y1="4" x2="20" y2="20" />
    </svg>
);

const IconShield = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
    </svg>
);
// ───────────────────────────────────────────────────────────

export default function Cart({ user, cartCount, fetchCartCount }) {
    const [cartItems, setCartItems] = useState([]);
    const [cartToggle, setCartToggle] = useState(false);
    const [cartItemsLoading, setCartItemsLoading] = useState(false);
    const [promoCode, setPromoCode] = useState("");
    const [promoMsg, setPromoMsg] = useState(null);
    const [discount, setDiscount] = useState(0);
    const [totalCheckOutCost, setTotalCheckOutCost] = useState(0);
    const navigate = useNavigate();

    const PROMOS = {
        SAVE10:    { pct: 10 },
        WELCOME20: { pct: 20 },
        FLAT5:     { flat: 5 },
    };

    const handleCartToggle = async (value) => {
        setCartToggle(value);
        if (value) {
            setCartItemsLoading(true);
            await fetchCartItems();
            setCartItemsLoading(false);
        }
    };

    const fetchCartItems = async () => {
        try {
            const response = await getAllCartItems();
            setCartItems(response.data.items);
            setTotalCheckOutCost(response.data.totalCheckOutCost);
        } catch (err) {
            if (err.status === 401) alert("Session expired..");
            console.log(err);
        }
    };

    const handleUpdateQty = async (id, qty) => {
        // setCartItems((prev) =>
        //     prev.map((item) => (item.id === id ? { ...item, qty } : item))
        // );
        try {
            const response = await updateItemQuantity(id, qty);
            await fetchCartItems();
            await fetchCartCount();
        }
        catch(err) {
            console.log(err);
        }
    };

    const handleRemove = async (id) => {
        // setCartItems((prev) => prev.filter((item) => item.id !== id));
        try {
            const response = await deleteItem(id);
            await fetchCartItems();
            await fetchCartCount();
        }
        catch(err) {
            console.log(err);
        }
    };

    const handleApplyPromo = () => {
        const code = promoCode.trim().toUpperCase();
        const promo = PROMOS[code];
        if (promo) {
            const disc = promo.pct
                ? subtotal * (promo.pct / 100)
                : Math.min(promo.flat, subtotal);
            setDiscount(disc);
            setPromoMsg({ type: "success", text: `Promo "${code}" applied!` });
        } else {
            setDiscount(0);
            setPromoMsg({ type: "error", text: "Invalid code. Try SAVE10, WELCOME20, or FLAT5." });
        }
    };

    const handlePayment = async (totalCheckOutCost) => {
        try {
            const response = await payment(totalCheckOutCost);
            if(response.success) {
                window.location.reload();
            }
            else {
                alert('Payment failed. Please try again..');
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = subtotal > 0 ? 5 : 0;
    const total    = subtotal - discount + shipping;
    const totalQty = cartItems.reduce((a, i) => a + i.qty, 0);

    return (
        <>
            {/* ── Cart Icon — untouched ── */}
            <div
                className="cart-icon-wrapper"
                aria-label="Cart"
                onClick={() => handleCartToggle(!cartToggle)}
            >
                <IconCart />
                {cartCount > 0 && (
                    <span className="cart-count-badge">{cartCount}</span>
                )}
            </div>

            {/* ── Overlay + Modal ── */}
            {cartToggle && (
                <div className="cart-overlay" onClick={() => handleCartToggle(false)}>
                    <div className="cart-modal-box" onClick={(e) => e.stopPropagation()}>

                        {/* Header */}
                        <div className="cart-modal-header">
                            <div className="cart-modal-title-row">
                                <h5>Cart</h5>
                                <span className="cart-item-count">{cartCount} items</span>
                            </div>
                            <button
                                className="cart-close-btn"
                                onClick={() => handleCartToggle(false)}
                                aria-label="Close"
                            >✕</button>
                        </div>

                        {/* Body */}
                        <div className="cart-modal-body">

                            {/* Left — Items */}
                            <div className="cart-items-col">
                                {cartItemsLoading ? (
                                    <div className="cart-state-box">
                                        <div className="cart-spinner" />
                                        <p className="cart-state-text">Loading your cart...</p>
                                    </div>
                                ) : cartItems.length === 0 ? (
                                    <div className="cart-state-box">
                                        <IconEmptyCart />
                                        <p className="cart-state-text">Your cart is empty</p>
                                    </div>
                                ) : (
                                    cartItems.map((item) => (
                                        <div key={item.id} className="product-card">
                                            <div className="product-row">

                                                {/* Image */}
                                                <div className="col-img">
                                                    {item.image ? (
                                                        <img src={item.image} alt='image' className="product-image" />
                                                    ) : (
                                                        <div className="product-image-placeholder">
                                                            <IconBox />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Info */}
                                                <div className="col-info">
                                                    <p className="product-name">{item.name}</p>
                                                    <p className="product-variant">{item.description}</p>
                                                    {item.badge && (
                                                        <span className="discount-badge">{item.badge}</span>
                                                    )}
                                                </div>

                                                {/* Qty */}
                                                <div className="col-qty">
                                                    <div className="qty-wrapper">
                                                        <button
                                                            className="quantity-btn"
                                                            onClick={() => handleUpdateQty(item.id, item.quantity - 1)}
                                                            aria-label="decrease"
                                                        >−</button>
                                                        <input
                                                            type="number"
                                                            className="quantity-input"
                                                            value={item.quantity}
                                                            onChange={(e) =>
                                                                handleUpdateQty(item.id, parseInt(e.target.value))
                                                            }
                                                        />
                                                        <button
                                                            className="quantity-btn"
                                                            onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
                                                            aria-label="increase"
                                                        >+</button>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <div className="col-price">
                                                    {/* ₹{item.price}|₹{(item.price * item.quantity).toFixed(2)} */}
                                                    <div className="price-stack">
                                                        <span className="unit-price">₹{item.price}</span>
                                                        <span className="total-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                </div>

                                                {/* Delete */}
                                                <div className="col-remove">
                                                    <button
                                                        className="remove-btn"
                                                        onClick={() => handleRemove(item.id)}
                                                        aria-label="remove item"
                                                    >
                                                        <IconTrash />
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Right — Order Summary */}
                            <div className="summary-card">
                                <h5 className="summary-title">Order Summary</h5>

                                <div className="summary-row">
                                    <span className="summary-label">Subtotal</span>
                                    <span>₹{totalCheckOutCost.toFixed(2)}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="summary-row">
                                        <span className="summary-label">Discount</span>
                                        <span className="summary-discount">-₹{discount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="summary-row">
                                    <span className="summary-label">Shipping</span>
                                    <span>{shipping > 0 ? `₹${shipping.toFixed(2)}` : "Free"}</span>
                                </div>

                                <hr className="summary-divider" />

                                <div className="summary-total">
                                    <span>Total</span>
                                    <span>₹{totalCheckOutCost.toFixed(2)}</span>
                                </div>

                                {/* Promo */}
                                <div className="promo-group">
                                    <input
                                        type="text"
                                        className="promo-input"
                                        placeholder="Promo code"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                                    />
                                    <button className="promo-apply-btn" onClick={handleApplyPromo}>
                                        Apply
                                    </button>
                                </div>
                                {promoMsg && (
                                    <p className={`promo-msg ${promoMsg.type}`}>{promoMsg.text}</p>
                                )}

                                <button className="checkout-btn" onClick={() => handlePayment(totalCheckOutCost)}>
                                    Proceed to Checkout
                                </button>

                                <div className="secure-note">
                                    <IconShield />
                                    <small>Secure checkout</small>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}