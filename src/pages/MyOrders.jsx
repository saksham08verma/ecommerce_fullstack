import { useEffect, useState } from "react";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/orders"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        setOrders(data);
      } catch (error) {
        console.error("Orders error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="status-message">
        <h2>Loading orders...</h2>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No orders yet 📦</h2>
          <p>Your placed orders will appear here.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-header">
                <div>
                  <strong>Order ID</strong>
                  <p>{order._id}</p>
                </div>

                <div>
                  <strong>Status</strong>
                  <p className="order-status">
                    {order.status}
                  </p>
                </div>
              </div>

              <hr />

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div
                    className="order-item"
                    key={index}
                  >
                    <div>
                      <h3>{item.name}</h3>
                      <p>
                        ₹{item.price.toLocaleString()} ×{" "}
                        {item.quantity}
                      </p>
                    </div>

                    <strong>
                      ₹{(
                        item.price * item.quantity
                      ).toLocaleString()}
                    </strong>
                  </div>
                ))}
              </div>

              <hr />

              <div className="order-footer">
                <div>
                  <strong>Payment:</strong>{" "}
                  {order.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Online Payment"}
                </div>

                <div>
                  <strong>Total:</strong>{" "}
                  ₹{order.totalAmount.toLocaleString()}
                </div>
              </div>

              <p className="order-date">
                Ordered on{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;