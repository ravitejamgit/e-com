import useProduct from "../../services/useProduct";
import ProductCard from "./ProductCard";

// const PRODUCTS = [
//   { id: 1,  name: "Ryzen 9 7950X",        brand: "AMD",      category: "CPU",          price: 68999 },
//   { id: 2,  name: "Core i9-14900K",        brand: "Intel",    category: "CPU",          price: 54999 },
//   { id: 3,  name: "Ryzen 5 7600X",         brand: "AMD",      category: "CPU",          price: 22999 },
//   { id: 4,  name: "RTX 4080 Super",        brand: "Nvidia",   category: "GPU",          price: 109999 },
//   { id: 5,  name: "RX 7900 XTX",           brand: "AMD",      category: "GPU",          price: 89999 },
//   { id: 6,  name: "RTX 4060 Ti",           brand: "Nvidia",   category: "GPU",          price: 44999 },
//   { id: 7,  name: "DDR5 32GB 6000MHz",     brand: "Corsair",  category: "RAM",          price: 14499 },
//   { id: 8,  name: "Trident Z5 16GB",       brand: "G.Skill",  category: "RAM",          price: 9999  },
//   { id: 9,  name: "980 Pro 2TB NVMe",      brand: "Samsung",  category: "Storage",      price: 18999 },
//   { id: 10, name: "WD Black SN850X 1TB",   brand: "WD",       category: "Storage",      price: 12499 },
//   { id: 11, name: "Kraken X73 360mm",      brand: "NZXT",     category: "Cooling",      price: 12499 },
//   { id: 12, name: "Cooler Master H500",    brand: "CoolerMaster", category: "Cooling",  price: 7499  },
//   { id: 13, name: "RM1000x 1000W",         brand: "Corsair",  category: "PSU",          price: 16999 },
//   { id: 14, name: "Seasonic Focus GX 850W",brand: "Seasonic", category: "PSU",          price: 13999 },
//   { id: 15, name: "Z790 Apex Encore",      brand: "ASUS",     category: "Motherboards", price: 42999 },
//   { id: 16, name: "MAG Z790 Tomahawk",     brand: "MSI",      category: "Motherboards", price: 28999 },
//   { id: 17, name: "MX Master 3S",          brand: "Logitech", category: "Peripherals",  price: 9499  },
//   { id: 18, name: "65W GaN Charger",       brand: "Anker",    category: "Chargers",     price: 2499  },
//   { id: 19, name: "100W USB-C Charger",    brand: "Belkin",   category: "Chargers",     price: 3499  },
//   { id: 20, name: "20000mAh Power Bank",   brand: "Anker",    category: "Batteries",    price: 4999  },
// ];

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

const handleAddToCart = (product) => {
  // Replace with your cart logic / context / API call
  console.log("Added to cart:", product);
};

export default function ProductGrid({ activeCategory, searchQuery, sortBy, onSortChange }) {
  const PRODUCTS = useProduct();
  console.log('from productsgrid.js product var: ', PRODUCTS);
  console.log('From the productgrid.js' , typeof(PRODUCTS));
  const filtered = PRODUCTS.filter((p) => {
    console.log(p.Name);
    console.log(p.Category);
    const matchesCategory = activeCategory === "All" || p.Category.name === activeCategory;
    const matchesSearch =
      p.Name.toLowerCase().includes(searchQuery.toLowerCase())
      //p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
              key={product.created_at}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}

    </div>
  );
}