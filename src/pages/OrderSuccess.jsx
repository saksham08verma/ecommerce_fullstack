function OrderSuccess({ onContinue }) {
  return (
    <div className="order-success">
      <div className="success-card">
        <div className="success-icon">✓</div>

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for your order. Your order has been placed successfully.
        </p>

        <button onClick={onContinue}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;