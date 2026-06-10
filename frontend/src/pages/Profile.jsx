import { useEffect, useState } from "react";
import Orders from "../components/Orders";
import AccountDetails from "../components/AccountDetails";
import "../styles/ProfileDashboard.css";
import { fetchProfile } from "../services/ProfileService";
import { useLocation, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { id: "orders",     label: "Orders & Tracking",  icon: "📦" },
  { id: "account",  label: "Account Details",  icon: "📍" },
];

const TABS = {
  orders:    Orders,
  account: AccountDetails,
};

function renderTab(tab) {
  switch (tab) {
    case "orders":     return <Orders />;
    case "account":     return <AccountDetails/>
  }
}


export default function Profile() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || "orders");
  const [customer,  setCustomer]  = useState({});
  const [orders,    setOrders]    = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetch = async () => {
        const data = await fetchProfile();
        setCustomer(data);
      }
      fetch();

    } catch (error) {
      System.out.println(error)
      navigate('/');
    }
  }, []);

  const tabProps = { customer, orders };
  

  const ActivePanel = TABS[activeTab];

  return (
    <div className="hub-wrapper">
      <div className="hub-container">
        {/* ── Sidebar ── */}
        <aside className="hub-sidebar">
   
          <div className="customer-meta">
            <div className="customer-avatar">{customer?.initials ?? "…"}</div>
            <h2 className="customer-name">{customer?.username ?? " "}</h2>
            <p className="customer-id">Customer ID: {customer?.id ?? " "}</p>
          </div>

          <nav>
            <ul className="hub-nav">
              {NAV_ITEMS.map(item => (
                <li key={item.id}>
                  <button
                    className={`nav-btn${activeTab === item.id ? " active" : ""}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    {/* <span className="nav-icon">{item.icon}</span> */}
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

       <main className="hub-content">
          {renderTab(activeTab)}
        </main>

      </div>
    </div>
  );
}