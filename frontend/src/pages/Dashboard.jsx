import { useState } from "react";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import CategoryBar from "../components/dashboard/CategoryBar";
import ProductGrid from "../components/dashboard/ProductGrid";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  return (
    <div className="dashboard">
      <DashboardNavbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
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
      />
    </div>
  );
}