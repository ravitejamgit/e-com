import React, { useState } from 'react'
import styles from '../styles/Dropdown.module.css';
import { useNavigate } from 'react-router-dom';


export default function Dropdown() {
    const navigate = useNavigate();
    const [showOrders, setShowOrders] = useState(false);

    return (
        <div className={styles.dropdown} role="menu">
            <button
                    className={styles.item}
                    onClick={() => navigate('/profile', {state: { tab: 'orders'}})}
                    role="menuitem"
                >
                    <span className={styles.icon}>🛍️</span> My orders
            </button>

            <button
                className={styles.item}
                onClick={() => { navigate('/profile', {state: { tab: 'account'}}) }}
                role="menuitem"
            >
                <span className={styles.icon}>👤</span> Profile
            </button>

            <div className={styles.divider} />

            <button
                className={`${styles.item} ${styles.itemDanger}`}
                role="menuitem"
            >
                <span className={styles.icon}>🚪</span> Log out
            </button>

            {
                showOrders && (
                    <div>
                        <p>orders</p>
                    </div>
                )
            }
        </div>
    )
}