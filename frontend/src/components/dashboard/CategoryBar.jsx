const CATEGORIES = [
  "All",
  "CPU",
  "GPU",
  "rams",
  "Storage",
  "Cooling",
  "PSU",
  "Motherboards",
  "Peripherals",
  "Chargers",
  "Batteries",
];

export default function CategoryBar({ activeCategory, onCategoryChange }) {
  return (
    <div className="category-bar" role="navigation" aria-label="Product categories">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          className={`category-pill ${activeCategory === category ? "category-pill--active" : ""}`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}