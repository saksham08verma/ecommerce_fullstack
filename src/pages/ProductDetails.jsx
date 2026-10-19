import { useState } from "react";
import { useCart } from "../context/CartContext";

function ProductDetails({ product, onBack, onBuyNow }) {
  const { addToCart } = useCart();

  const productImages = product.images?.length
    ? product.images
    : [product.images];

   const [selectedImage, setSelectedImage] = useState(
    productImages[0]
   );

  if (!product) {
    return (
      <div className="status-message">
        <h2>Product not found</h2>
        <button onClick={onBack}>Back to Products</button>
      </div>
    );
  }

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
    <div className="product-details-page">
      <button className="back-btn" onClick={onBack}>
        ← Back to Products
      </button>

      <div className="product-details-container">

        <div className="product-gallery">
  <div className="thumbnail-list">
    {productImages.map((image, index) => (
      <img
        key={index}
        src={image}
        alt={`${product.name} ${index + 1}`}
        className={`thumbnail ${
          selectedImage === image ? "selected" : ""
        }`}
        onClick={() => setSelectedImage(image)}
      />
    ))}
  </div>

  <div className="main-product-image">
    <img
      src={selectedImage}
      alt={product.name}
    />
  </div>
</div>

        <div className="product-details-info">
          <h1>{product.name}</h1>

          <div className="details-rating">
            ⭐ {product.rating}
            <span> ({product.reviews} Reviews)</span>
          </div>

          <hr />

          <div className="details-price">
            ₹{product.price.toLocaleString()}

            <span>
              ₹{product.originalPrice.toLocaleString()}
            </span>

            <strong>{discount}% off</strong>
          </div>

          <p className="details-description">
            {product.description}
          </p>

          <p>
            🚚 <strong>Free Delivery</strong>
          </p>

          <p>
            📦 Stock available: {product.stock}
          </p>

          <div className="details-buttons">
            <button
              className="details-cart-btn"
              onClick={handleAddToCart}
            >
              🛒 Add to Cart
            </button>

            <button className="buy-now-btn" 
            onClick={() => {
                addToCart(product);
                onBuyNow();
            }}
            >
              ⚡ Buy Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;