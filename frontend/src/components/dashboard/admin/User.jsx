import React, { useEffect, useState } from 'react';
import styles from '../../../styles/User.module.css';
import { deleteUser, fetchUsers, updateStatus } from '../../../services/AdminService';

export default function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', role: 'Viewer' });

  const toggleStatus = async (e, data) => {
    e.preventDefault();
    //setUsers(users.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u));
    try {
      const response = await updateStatus(data);
      setTrigger(!trigger);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    
    try {
      const response = await deleteUser(formData.id);
      setFormData({});
      setIsModalOpen(false);
      setTrigger(!trigger);
    } catch (error) {
      console.log(error);
    }
    
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await fetchUsers();
        setUsers(response.users);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetch();
  }, [trigger]);

  return (
    <div>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Users Directory</h2>
        {/* <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>Add User</button> */}
      </div>
      <div>
        <span>Total users : {users.length}</span>
      </div>
      {
        loading ? 
        (
          <div className="cart-state-box">
            <div className="cart-spinner" />
            <p className="cart-state-text">Loading users...</p>
          </div>
        ) 
        : 
        (
          <div>
            { 
              users.map(user => (
                <div key={user.id} className={styles.card}>
                  <div className={styles.userInfo}>
                    <span className={styles.usernameText}>@{user.username}</span>
                    <span className={styles.emailText}>{user.email}</span>
                    <span className={styles.badge}>{user.role}</span>
                  </div>
                  <div className={styles.actions}>
                    <button 
                      className={`${styles.statusBtn} ${user.isActive ? styles.statusActive : ''}`} 
                      onClick={(e) => toggleStatus(e, {id: user.id, status: !user.isActive})}
                    >
                      {user.isActive ? 'Active' : 'Disabled'}
                    </button>
                    <button className={styles.deleteBtn} onClick={() => { setFormData(users.find(each => each.id === user.id)); setIsModalOpen(true) }}>Delete</button>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalCard} onClick={e => e.stopPropagation()}>
            <h3 className={styles.modalHeading}>Delete User</h3>
            <form onSubmit={handleDeleteUser}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Username</label>
                <input type="text" className={styles.input} value={formData.username} disabled />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <input type="email" className={styles.input} value={formData.email} disabled />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Role</label>
                <input type="text" className={styles.input} value={formData.role} disabled />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Status</label>
                <input type="text" className={styles.input} value={formData.isActive ? 'Active' : 'Disabled'} disabled />
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => {setFormData({}); setIsModalOpen(false)}} className={styles.cancelBtn}>Cancel</button>
                <button type="submit" className={styles.saveBtn}>Delete</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}