import { useState } from "react";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import CategoryBar from "../components/dashboard/CategoryBar";
import ProductGrid from "../components/dashboard/ProductGrid";
import "../styles/Dashboard.css";
import useProduct from "../services/useProduct";

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [user, setUser] = useState('Guest');
  const [PRODUCTS, USER] = useProduct();

  return (
    <div className="dashboard">
      <DashboardNavbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        user={USER?.name || 'GUEST'}
      />
      <CategoryBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ProductGrid
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        PRODUCTS={PRODUCTS}
      />
    </div>
  );
}