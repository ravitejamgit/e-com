import React, { useEffect, useState } from 'react'
import '../styles/AccountDetail.css'
import { fetchProfile, update } from '../services/ProfileService'


export default function AccountDetails() {
  const [profile, setProfile] = useState([]);
  const [load, setLoad] = useState(false);


  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProfile();
        setProfile(data);
      }
      catch(err) {
        console.log(err);
      }
    }
    loadData();
  }, [load]);

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  const handleEditStart = (field, currentVal) => {
    setEditingField(field);
    setTempValue(field === 'password' ? '' : currentVal);
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleSave = async (field) => {
    if (tempValue.trim() === '') return handleCancel();
    
    // setProfile(prev => ({
    //   ...prev,
    //   [field]: tempValue
    // }));

    try {
      const status = await update(field, tempValue);
      if(status === 200) {
        alert(" updated successfully.");
        setLoad(!load);
      }
      else {
        throw new Error("failed to update.");
      }
    }
    catch(err) {
      console.log(err);
      alert("failed to update password");
    }
    setEditingField(null);
    setTempValue('');
    console.log(`Saved updated ${field} to backend database.`);
  };

  return (
    <div className="orders-wrap">
      <h3 className="view-title">Account Settings</h3>
      
      {/* EMAIL ROW */}
      <div className="order-card">
        <div className="order-meta">
          <span className="order-num">Email Address</span>
          {editingField === 'email' ? (
            <input 
              type="email" 
              className="settings-input" 
              value={tempValue} 
              onChange={(e) => setTempValue(e.target.value)}
              autoFocus
            />
          ) : (
            <span className="order-date">{profile.email}</span>
          )}
        </div>
        <div>
          {editingField === 'email' ? (
            <>
              <button className="btn-save" onClick={() => handleSave('email')}>Save</button>
              <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button className="btn-update" onClick={() => handleEditStart('email', profile.email)}>Update</button>
          )}
        </div>
      </div>

      {/* ROLE ROW */}
      {/* <div className="order-card">
        <div className="order-meta">
          <span className="order-num">Account Role</span>
          <span className="order-date">{profile.role}</span>
        </div>
        <div>
          <span className="disabled-text">Locked</span>
        </div>
      </div> */}

      {/* USERNAME ROW */}
      <div className="order-card">
        <div className="order-meta">
          <span className="order-num">Username</span>
          {editingField === 'username' ? (
            <input 
              type="text" 
              className="settings-input" 
              value={tempValue} 
              onChange={(e) => setTempValue(e.target.value)}
              autoFocus
            />
          ) : (
            <span className="order-date">{profile.username}</span>
          )}
        </div>
        <div>
          {editingField === 'username' ? (
            <>
              <button className="btn-save" onClick={() => handleSave('name')}>Save</button>
              <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button className="btn-update" onClick={() => handleEditStart('username', profile.username)}>Update</button>
          )}
        </div>
      </div>

      {/* PASSWORD ROW */}
      <div className="order-card">
        <div className="order-meta">
          <span className="order-num">Password</span>
          {editingField === 'password' ? (
            <input 
              type="password" 
              placeholder="Enter new password"
              className="settings-input" 
              value={tempValue} 
              onChange={(e) => setTempValue(e.target.value)}
              autoFocus
            />
          ) : (
            <span className="order-date">{profile.password || '***********'}</span>
          )}
        </div>
        <div>
          {editingField === 'password' ? (
            <>
              <button className="btn-save" onClick={() => handleSave('password')}>Save</button>
              <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button className="btn-update" onClick={() => handleEditStart('password', profile.password)}>Update</button>
          )}
        </div>
      </div>
    </div>
  );
}
