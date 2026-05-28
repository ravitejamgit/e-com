export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">

      <div className="product-card__image">
        <span className="product-card__category-tag">{product.category}</span>
        <img src={product.images} alt={product.name} width="150"/>
      </div>

      <div className="product-card__body">
        <p className="product-card__name">{product.name}</p>
        <p className="product-card__brand">{product.brand}</p>

        <div className="product-card__footer">
          <span className="product-card__price">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <button
            className="product-card__add-btn"
            onClick={() => onAddToCart(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            + Add
          </button>
        </div>
      </div>

    </div>
  );
}