import { useState } from "react";
import { useCart } from "../context/CartContext";

function Checkout({ onBack, onSuccess }) {
  const { cart, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    pinCode: "",
    paymentMethod: "cod",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);

    const orderData = {
      customer: {
        name: formData.name,
        mobile: formData.mobile,
        address: formData.address,
        city: formData.city,
        pinCode: formData.pinCode,
      },

      items: cart.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),

      totalAmount: cartTotal,

      paymentMethod: formData.paymentMethod,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      console.log("Order saved:", data);

      clearCart();
      onSuccess();
    } catch (error) {
      console.error("Order error:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <h1>Checkout</h1>

      <div className="checkout-container">
        <div className="delivery-form">
          <h2>Delivery Address</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />

            <textarea
              name="address"
              placeholder="Full Delivery Address"
              rows="4"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="pinCode"
              placeholder="PIN Code"
              value={formData.pinCode}
              onChange={handleChange}
              required
            />

            <h2>Payment Method</h2>

            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="online"
                checked={formData.paymentMethod === "online"}
                onChange={handleChange}
              />
              Online Payment
            </label>

            <button
              type="submit"
              className="place-order-btn"
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="checkout-item" key={item._id}>
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹{(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}

          <hr />

          <div className="checkout-total">
            <strong>Total Amount</strong>

            <strong>
              ₹{cartTotal.toLocaleString()}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;