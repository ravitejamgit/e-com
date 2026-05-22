export default function DashboardNavbar({ searchQuery, onSearchChange }) {
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
        <div className="dashboard-cart" aria-label="Cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span className="dashboard-cart-badge">3</span>
        </div>  
        <div>
          <h3>JDfgdfr</h3>
        </div>
      </div>
    </nav>
  );
}