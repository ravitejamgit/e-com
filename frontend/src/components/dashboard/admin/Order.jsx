import React, { useEffect, useState } from 'react';
import styles from '../../../styles/Orders.module.css';
import { fetchAllOrders } from '../../../services/AdminService';

export default function Order() {
  const [searchId, setSearchId] = useState('');
  const [trigger, setTrigger] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  
  // const orders = [
  //   { id: 'ORD-1094', userId: 'user_44', total: '$199.00', status: 'Delivered' },
  //   { id: 'ORD-8841', userId: 'user_99', total: '$14.25', status: 'Pending' },
  //   { id: 'ORD-3022', userId: 'user_44', total: '$85.50', status: 'Shipped' },
  // ];

  // const filteredOrders = orders.filter(o => 
  //   o.userId.toLowerCase().includes(searchId.trim().toLowerCase())
  // );

  // Helper function to dynamically add style modifications based on status text colors
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return { color: '#2ecc71' };
      case 'Pending': return { color: '#e67e22' };
      default: return { color: 'var(--primary-dark)' };
    }
  };

  const handleView = (e, id) => {
    e.preventDefault();
    setModalData(orders.find((each) => each.order_id === id));
    setIsModalOpen(true);
  }

  const handleFilter = (value) => {
    setSearchId(value);
    if(value === '')
      setFiltered(orders);
    else 
      setFiltered(orders.filter((each) => each.product_name.toLowerCase().includes(value.toLowerCase())));
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchAllOrders();
        //setOrders(Object.groupBy(response.orders, (each) => each.order_id));
        setOrders(response.orders);
        setFiltered(response.orders);
        //setGroupedData(Object.groupBy((response.orders), (item) => item.order_id));
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [trigger])

  return (
    <div>
      <h2 className={styles.heading}>Orders</h2>
      <input 
        type="text" 
        placeholder="Filter by" 
        className={styles.searchBar} 
        value={searchId}
        onChange={e => handleFilter(e.target.value)}
      />

      {/* Row List Cards Container */}
      <div className={styles.listContainer}>
        <div className={styles.card}>
        {/* Data columns section */}
        <div className={styles.orderInfo}>
          <span className={styles.header_orderIdText}><strong>Product Name</strong></span>
          <span className={styles.header_userIdText}><strong>Ordered by:</strong></span>
          <span className={styles.header_totalText}><strong>Unit Price: </strong></span>
          <span className={styles.header_totalText}><strong>Quantity </strong></span>
          <span className={styles.header_totalText}><strong>Total price</strong></span>
        </div>
        
        {/* Status column section */}
        <div className={styles.actions}>
          <span className={styles.header_statusText}><strong>Status</strong></span>
        </div>
      </div>

        {
          filtered.map((order, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.orderInfo}>
                <span className={styles.orderIdText} onClick={(e) => handleView(e, order.order_id)}><strong>{order.product_name}</strong></span>
                <span className={styles.userIdText}>{order.email}</span>
                <span className={styles.totalText}>₹ {order.price_per_unit}/-</span>
                <span className={styles.totalText}>{order.quantity}</span>
                <span className={styles.totalText}>₹ {order.total_price}/-</span>
              </div>
              <div className={styles.actions}>
                <span 
                  className={styles.statusBadge} 
                  style={getStatusStyle(order.status)}
                >
                  {order.order_status}
                </span>
              </div>
            </div>
          ))
        }

        {filtered.length === 0 && (
          <p className={styles.emptyState}>
            No transactional items mapped to that assignment.
          </p>
        )}
      </div>

      {
        
      isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            {/* Header */}
            <div className={styles.modalHeader}>
              <h2>Order Details</h2>
              <span 
                className={styles.statusBadge} 
                style={getStatusStyle(modalData.order_status)}
              >
                {modalData.order_status}
              </span>
            </div>
            
            {/* Content Body */}
            <div className={styles.modalBody}>
              {/* Section 1: Customer & Order Meta */}
              <div className={styles.sectionTitle}>Order Metadata</div>
              <div className={styles.gridContainer}>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Order ID:</span>
                  <span className={styles.value}>{modalData.order_id}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Date:</span>
                  <span className={styles.value}>{modalData.ordered_date}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Customer:</span>
                  <span className={styles.value}>{modalData.username}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Email:</span>
                  <span className={styles.value}>{modalData.email}</span>
                </div>
              </div>

              {/* Section 2: Product Breakdown */}
              <div className={styles.sectionTitle}>Product Details</div>
              <div className={styles.gridContainer}>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Product ID:</span>
                  <span className={styles.value}>{modalData.product_id}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Product Name:</span>
                  <span className={styles.value}>{modalData.product_name}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Rate per Item:</span>
                  <span className={styles.value}>₹ {modalData.price_per_unit}/-</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Quantity:</span>
                  <span className={styles.value}>x {modalData.quantity}</span>
                </div>
              </div>

              {/* Full-width Description block */}
              <div className={styles.descriptionBlock}>
                <span className={styles.label}>Product Description:</span>
                <p className={styles.descriptionText}>{modalData.product_description}</p>
              </div>

              {/* Highlighted Total Banner */}
              <div className={styles.totalBanner}>
                <span>Grand Total</span>
                <span className={styles.grandPrice}>₹ {modalData.total_price}/-</span>
              </div>
            </div>
            
            <div className={styles.modalFooter}>
              <button 
                className={styles.closeButton} 
                onClick={() => { setModalData(false); setIsModalOpen(false); }}
                >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}