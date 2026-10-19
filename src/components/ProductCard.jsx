import { useCart } from "../context/CartContext";

function ProductCard({ product, onView }) {
  const { addToCart } = useCart();

  const discount = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) *
      100
  );

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="product-card">

      <div className="wishlist">♡</div>

      {/* PRODUCT IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
        onClick={onView}
        style={{ cursor: "pointer" }}
      />

      <div className="product-info">

        {/* PRODUCT NAME */}
        <h3
          onClick={onView}
          style={{ cursor: "pointer" }}
        >
          {product.name}
        </h3>

        <div className="rating">
          ⭐ {product.rating} <span>({product.reviews})</span>
        </div>

        <div className="price">
          ₹{product.price.toLocaleString()}

          <span className="original-price">
            ₹{product.originalPrice.toLocaleString()}
          </span>
        </div>

        <div className="discount">
          {discount}% off
        </div>

        <p className="delivery">
          🚚 Free delivery
        </p>

        <button
          className="cart-btn"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;