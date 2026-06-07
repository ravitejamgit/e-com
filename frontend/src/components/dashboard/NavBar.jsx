import Cart from "./Cart";
import Profile from "./Profile";


export default function Navbar({ searchQuery, onSearchChange, user, cartCount, navigate, fetchCartCount }) {
  return (
    <nav className="dashboard-navbar">

      <a className="dashboard-brand" href="/dashboard">
        <svg className="dashboard-brand-logo" viewBox="0 0 22 22" fill="none">
          <polygon points="3,3 3,19 17,11" fill="#4A68FC" />
        </svg>
        <span className="dashboard-brand-text">
          <span className="dashboard-brand-black">Core</span>
          <span className="dashboard-brand-blue">Nest</span>
        </span>
      </a>

      <div className="dashboard-search-wrap">
        <svg className="dashboard-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className="dashboard-search-input"
          placeholder="Search components, brands…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="dashboard-nav-right">
          <Cart cartCount={cartCount} navigate={navigate} fetchCartCount={fetchCartCount}/>
          <Profile user={user}/>
          
      </div>
      
    </nav>
  );
}