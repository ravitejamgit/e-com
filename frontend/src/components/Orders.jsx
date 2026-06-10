import React, { useState } from 'react'
import '../styles/Orders.css'
import fetchAllOrders from '../services/OrderService';
import { useNavigate } from 'react-router-dom';
 
function OrderCard({ order }) {
 
  return (
    <div className="order-card">
      
      <img src= { order.image } alt='<image>'/>

      {/* top */}
      <div className="card-top">
        <div className="order-meta">
          <span><i><h4>{order.name}</h4></i></span>
          <span className="order-num">#{order.order_id}</span>
          <span className="order-date">
            <i className="ti ti-calendar" aria-hidden="true" />
            {order.ordered_date.substring(0, 10) + " " + order.ordered_date.substring(12)}
          </span>
        </div>
        <div className="order-meta">
            <span className="meta-label-top">Unit Price</span>
            <span className="meta-value-top">₹ {order.price_per_unit}/-</span>
          </div>
        <div className='order-meta'>
          <span className="meta-label-top">Total</span>
          <span className="meta-value-top">₹ {order.total_price}/-</span>
        </div>
        
      </div>

      <div className="card-divider" />
      <div className="card-bottom">
        <div className="bottom-meta">
          <div className="meta-item">
            <span className="meta-label">quantity</span>
            <span className="meta-value">{order.quantity}</span>
          </div>
        </div>
 
        <div className="card-actions">
          {order.status === "transit" && (
            <>
              <button className="btn-action"><i className="ti ti-map-pin" aria-hidden="true" /> Track</button>
              <button className="btn-action"><i className="ti ti-file-text" aria-hidden="true" /> Invoice</button>
            </>
          )}
          {order.status === "success" && (
            <>
              <button className="btn-action"><i className="ti ti-refresh" aria-hidden="true" /> Reorder</button>
              <button className="btn-action"><i className="ti ti-file-text" aria-hidden="true" /> Invoice</button>
              <button className="btn-action"><i className="ti ti-star" aria-hidden="true" /> Review</button>
            </>
          )}
          {order.status === "processing" && (
            <button className="btn-action"><i className="ti ti-x" aria-hidden="true" /> Cancel</button>
          )}
          {order.status === "cancelled" && (
            <button className="btn-action"><i className="ti ti-refresh" aria-hidden="true" /> Reorder</button>
          )}
        </div>
      </div>
    </div>
  );
}


export default function Orders() {
  const [orders,    setOrders]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();
 
  useState(async () => {
    setLoading(true);
    try {
      const data = await fetchAllOrders();
      //console.log(data.products);
      setOrders(data.products);
    }
    catch(err) {
      navigate('/');
      console.log(err);
    }
    setLoading(false);
  }, []);
  

  const filtered = activeFilter === "All" ? orders : orders.filter(o => STATUS_MAP[o.status]?.filter === activeFilter); 
 
  if (loading) return (
    <div className="orders-wrap">
      <h3 className="view-title">Orders &amp; Tracking</h3>
      <div className="state-loading"><div className="spinner" /><span>Loading orders…</span></div>
    </div>
  );
 
  if (error) return (
    <div className="orders-wrap">
      <h3 className="view-title">Orders &amp; Tracking</h3>
      <div className="state-error"><i className="ti ti-alert-triangle" aria-hidden="true" />{error}</div>
    </div>
  );

  return (
     <div className="orders-wrap">
      <div>
        <h3 className="view-title">Orders </h3>
        <h5 className='track-label'><i>{filtered.length}</i></h5>
      </div>
      {
        filtered.length === 0 ? (
          <div className="state-empty">
            <i className="ti ti-package-off" aria-hidden="true" style={{ fontSize: 32, color: "var(--text-secondary)" }} />
            <span>No orders found.</span>
          </div>
        ) : (
          <div className="orders-list">
            {
              filtered.map(order => (
                <OrderCard key={order.product_id} order={order} />
              ))
            }
          </div>
        )
      }
    </div>
  )
}
