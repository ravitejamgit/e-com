import React, { useEffect, useState } from 'react';
import styles from '../../../styles/Products.module.css';
import addProduct, { getAllProducts, getAllCategories, deleteProduct } from '../../../services/AdminService';
import { useNavigate } from 'react-router-dom';

const emptyFormData = { name: '', description: '', price: '', stock: '', category: '', image_url: '' };

export default function ProductsComponent() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(emptyFormData);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        const res = await getAllCategories();
        setProducts(data.products);
        setFiltered(data.products);
        setCategories(res.categories);
        setLoading(false);
      } catch (error) {
        if(error.status == 401) {
          alert('session expired..');
          navigate('/');
        }
      } 
    }
    fetch();
  }, [trigger]); 

  const handleDelete = async (e, id) => {
    // setProducts(products.filter(p => p.id !== id));
    e.preventDefault();
    try {
      const response = await deleteProduct(id);
      setTrigger(!trigger);
    } catch (error) {
      if(err.status == 401) {
        alert('session expired..');
        navigate('/');
      }
      console.log(error.response.data);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    // setProducts([...products, { id: Date.now(), ...formData }]);
    // setIsModalOpen(false);
    // setFormData({ name: '', description: '', price: '', stock: '', category: 'Electronics', image_url: '' });
    try {
      const response = await addProduct(formData);
      if(response === 201) {
        setFormData(emptyFormData);
        setIsModalOpen(false);
        setTrigger(!trigger);
      }

    } catch (err) {
      console.log(err);
        if(err.status == 401) {
          alert('session expired..');
          navigate('/');
        }
        if(err.status == 400) {
          console.log(err);
          console.log(err.response.data);
        }
    }

  };

  const handleFilter = (tag) => {
    
    if(tag == 'All') {
      setFiltered(products);
    }
    else {
      setFiltered(products.filter(each => each.category === tag));
    }
    setActiveCategory(tag);
    
  }

  return (
    <div>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Stock Control</h2>
        <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>Add Product</button>
      </div>
        {
          loading ? (
            <div className="cart-state-box">
              <div className="cart-spinner" />
              <p className="cart-state-text">Loading products...</p>
            </div>
          )
          :
          (
            <div>
              <div className="category-bar" role="navigation" aria-label="Product categories">
                <button className={`category-pill ${activeCategory === 'All' ? "category-pill--active" : ""}`} onClick={() => handleFilter('All')}>All</button>
                {
                  categories.map((each, index) => (
                    <button 
                      key={index}
                      className={`category-pill ${activeCategory === each.name ? "category-pill--active" : ""}`}
                      value={each.name} 
                      onClick={() => handleFilter(each.name)}
                      >
                        <span>{each.name}</span>
                    </button>
                  ))
                }
              </div>
              <div className={styles.description}><span>Items ({filtered.length})</span></div>
              {
                
                filtered.map((product, index) => (
                    <div key={index} className={styles.card}>
                      <img 
                        src={product.image_url} 
                        alt="" 
                        className={styles.img} 
                      />
                      <div className={styles.info}>
                        <strong className={styles.title}>{product.name}</strong>
                        <div className={styles.description}>{product.description}</div>
                        <div className={styles.meta}>
                          <span>MRP: <strong> ₹{product.price}/-</strong></span>
                          {
                            product.stock > 5  ? <span>In Stock: <strong>{product.stock} units</strong></span>
                            : <span>In Stock: <strong style={{ color: 'red'}}>{product.stock} units</strong></span>
                          }
                          <span>Tag: <strong style={{ color: 'var(--primary-dark)' }}>{product.category}</strong></span>
                        </div>
                      </div>
                      <button className={styles.deleteBtn} onClick={(e) => handleDelete(e, product.id)}>Delete</button>
                    </div>
                  ))
              }
            </div>
          )
      }

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Add Product</h3>
            <form onSubmit={handleAddProduct}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Product Name</label>
                <input type="text" className={styles.input} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Specs / Description</label>
                <textarea style={{ resize: 'none' }} className={styles.input} rows="2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup} style={{ flex: 1 }}>
                  <label className={styles.label}>Price (₹)</label>
                  <input type="number" step="0.01" className={styles.input} value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
                </div>
                <div className={styles.formGroup} style={{ flex: 1 }}>
                  <label className={styles.label}>Stock</label>
                  <input type="number" className={styles.input} value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Category</label>
                <select className={styles.input} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  {/* <option value="Electronics">Electronics</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Home & Kitchen">Home & Kitchen</option> */}
                  <option value=''></option>
                  {
                    categories ? categories.map(cat => <option value={cat.name}>{cat.name.toUpperCase()}</option>) : <option>None</option>
                  }
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Image URL</label>
                <input type="text" placeholder="https://..." className={styles.input} value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => {setIsModalOpen(false); setFormData(emptyFormData)}} className={styles.cancelBtn}>Cancel</button>
                <button type="submit" className={styles.addBtn}>Add Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}