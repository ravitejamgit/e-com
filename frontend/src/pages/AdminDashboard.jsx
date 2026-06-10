import React, { useEffect, useState } from 'react';
import styles from '../styles/AdminDashboard.module.css';
import Product from '../components/dashboard/admin/Product';
import Bussiness from '../components/dashboard/admin/Bussiness'
import Order from '../components/dashboard/admin/Order'
import User from '../components/dashboard/admin/User'
import { LOUTOUT_URL } from '../config';
import { fetchProfile } from '../services/ProfileService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const [username, setUsername] = useState('Guest');
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
        const logout = async () => {
            const response = await axios.post(LOUTOUT_URL);
            if(response.status == 200) {
                navigate("/");
            }
            
        }
        logout();
    }
    catch(err) {
        console.log(err);
        alert('Failed to logout..');
    }
    alert('Logging out...');
  };

  useEffect(() => {
      const loadData = async () => {
        try {
          const data = await fetchProfile();
          setUsername(data.username);
        }
        catch(err) {
          console.log(err);
        }
      }
      loadData();
    }, []);

  return (
    <div className={styles.app}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>✦ CoreNest</div>
        <div className={styles.navRight}>
          <span className={styles.username}>{username}</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <button 
            className={`${styles.sidebarBtn} ${activeTab === 'orders' ? styles.activeTab : ''}`} 
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button 
            className={`${styles.sidebarBtn} ${activeTab === 'products' ? styles.activeTab : ''}`} 
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button 
            className={`${styles.sidebarBtn} ${activeTab === 'users' ? styles.activeTab : ''}`} 
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
        </aside>

        <main className={styles.mainContent}>
          {activeTab === 'orders' && <Order />}
          {activeTab === 'products' && <Product />}
          {activeTab === 'users' && <User />}
        </main>
      </div>
    </div>
  );
}