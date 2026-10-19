import { useCart } from "../context/CartContext";

function Cart({ onCheckout }) {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>
        <div className="empty-cart">
          <h2>Your cart is empty 🛒</h2>
          <p>Add some products to your cart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-container">
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item._id}>
              
              <img
                src={item.image}
                alt={item.name}
                className="cart-image"
              />

              <div className="cart-details">
                <h2>{item.name}</h2>

                <p className="cart-price">
                  ₹{item.price.toLocaleString()}
                </p>

                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.quantity - 1)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Price Details</h2>

          <div className="summary-row">
            <span>Total Items</span>
            <span>
              {cart.reduce(
                (total, item) => total + item.quantity,
                0
              )}
            </span>
          </div>

          <div className="summary-row">
            <span>Total Amount</span>
            <strong>₹{cartTotal.toLocaleString()}</strong>
          </div>

          <button className="checkout-btn"
          onClick={onCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;