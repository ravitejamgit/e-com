import useProduct from "../../services/useProduct";
import ProductCard from "./ProductCard";

const SORT_OPTIONS = [
  { value: "featured",    label: "Featured" },
  { value: "price-asc",   label: "Price: Low to High" },
  { value: "price-desc",  label: "Price: High to Low" },
  { value: "name-asc",    label: "Name: A to Z" },
];

const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  switch (sortBy) {
    case "price-asc":  return sorted.sort((a, b) => a.price - b.price);
    case "price-desc": return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":   return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:           return sorted;
  }
};

export default function ProductGrid({ activeCategory, searchQuery, sortBy, onSortChange, PRODUCTS, handleAddToCart }) {
  
  //console.log('from productsgrid.js product var: ', PRODUCTS);
  //console.log('From the productgrid.js' , typeof(PRODUCTS));
  if(PRODUCTS == null) {
    return;
  }

  const filtered = PRODUCTS.filter((p) => {
    //console.log(p);
    //const matchesCategory = activeCategory === "All" || p.category.name === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
      //p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    //return matchesCategory && matchesSearch;
    return matchesSearch;
  });

  

  const sorted = sortProducts(filtered, sortBy);

  return (
    <div className="product-grid-section">

      <div className="product-grid-header">
        <p className="product-grid-count">
          Showing <strong>{sorted.length}</strong> product{sorted.length !== 1 ? "s" : ""}
        </p>
        <div className="product-grid-sort">
          <span>Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="product-grid-sort-select"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="product-grid-empty">
          <p>No products found for "<strong>{searchQuery}</strong>"</p>
        </div>
      ) : (
        <div className="product-grid">
          {sorted.map((product) => (
            <ProductCard
              key={product.product_id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}

    </div>
  );
}