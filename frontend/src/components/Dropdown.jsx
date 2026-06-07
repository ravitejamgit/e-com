import React, { useState } from 'react'
import styles from '../styles/Dropdown.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LOUTOUT_URL } from '../config';


export default function Dropdown() {
    const navigate = useNavigate();
    const [showOrders, setShowOrders] = useState(false);

    const handleLogout = () => {
        try {
            const logout = async () => {
                const response = await axios.post(LOUTOUT_URL);
                if(response.status == 200) {
                    navigate("/");
                }
                throw Error("Logout failed.");
            }
            logout();
        }
        catch(err) {
            System.out.println(err);
        }
    }

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
                onClick={() => handleLogout()}
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