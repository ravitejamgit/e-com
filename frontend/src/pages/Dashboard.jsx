import { useEffect, useState } from "react";
import Navbar from "../components/dashboard/NavBar";
import CategoryBar from "../components/dashboard/CategoryBar";
import ProductGrid from "../components/dashboard/ProductGrid";
import "../styles/Dashboard.css";
import useProduct from "../services/useProduct";
import Cart from "../components/dashboard/Cart";
import {getCount, addProductToCart} from "../services/CartService";
import { useNavigation } from "react-router-dom";

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [PRODUCTS, USER] = useProduct(activeCategory);
  const [cartCount, setCartCount] = useState(0);
  const [cartError, setCartError] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);

  
  useEffect(() => {

    if(USER) {
      fetchCartCount();
    }

  }, [USER]);


  const fetchCartCount = async () => {
    setIsCartLoading(true);
    try {
      const response = await getCount();
      setCartCount(response.data.count);
      //console.log(response.data.count);
    }
    catch(err) {
      setCartError(true);
    }
    setIsCartLoading(false);
  }

  const handleAddToCart = async (itemId) => {
    try {
      const status = await addProductToCart(itemId);
      if(status === 201) {
        fetchCartCount();
      }
      else {
        alert("failed to add to cart");
      }
    }
    catch(err) {
      alert("Error adding to cart");
    }
  }

  return (
    <div className="dashboard">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        user={USER?.name || 'GUEST'}
        cartCount={isCartLoading ? '...' : cartError ? 'Error' : cartCount}
        fetchCartCount={fetchCartCount}
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
        handleAddToCart = {handleAddToCart}
        
      />
    </div>
  );
}