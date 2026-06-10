import React, { useState } from 'react';
import styles from '../../../styles/Business.module.css';

export default function Bussiness() {
  const [filters, setFilters] = useState({ date: '', month: '', year: '' });
  
  const businesses = [
    { id: 1, name: 'Apex Logistics', category: 'Enterprise', registered: '2026-06-01' },
    { id: 2, name: 'SaaS Alpha Studio', category: 'Tech Venture', registered: '2025-11-14' },
    { id: 3, name: 'Vanguard Retail', category: 'Commercial', registered: '2026-02-28' },
  ];

  const filteredBusinesses = businesses.filter(b => {
    const [bYear, bMonth, bDate] = b.registered.split('-');
    if (filters.date && bDate !== filters.date) return false;
    if (filters.month && bMonth !== filters.month) return false;
    if (filters.year && bYear !== filters.year) return false;
    return true;
  });

  return (
    <div>
      <h2 className={styles.heading}>Business Ledger</h2>
      
      <div className={styles.filterBar}>
        <select className={styles.select} value={filters.date} onChange={e => setFilters({...filters, date: e.target.value})}>
          <option value="">Day: None</option>
          {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        <select className={styles.select} value={filters.month} onChange={e => setFilters({...filters, month: e.target.value})}>
          <option value="">Month: None</option>
          {['01','02','03','04','05','06','07','08','09','10','11','12'].map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <select className={styles.select} value={filters.year} onChange={e => setFilters({...filters, year: e.target.value})}>
          <option value="">Year: None</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
        
        {(filters.date || filters.month || filters.year) && (
          <button className={styles.clearBtn} onClick={() => setFilters({ date: '', month: '', year: '' })}>Reset Filters</button>
        )}
      </div>

      <div className={styles.grid}>
        {filteredBusinesses.map(b => (
          <div key={b.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{b.name}</h3>
            <p className={styles.cardText}>Segment: <strong>{b.category}</strong></p>
            <p className={styles.cardMeta}>Opened: {b.registered}</p>
          </div>
        ))}
        {filteredBusinesses.length === 0 && <p className={styles.emptyState}>No matching businesses located.</p>}
      </div>
    </div>
  );
}