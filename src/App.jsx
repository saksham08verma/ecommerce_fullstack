import { useState } from "react";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import "./App.css";
import { useCart } from "./context/CartContext";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";

function App() {
  const [page, setPage] = useState("products");
  const { cartCount } = useCart();

  return (
    <>
      <nav className="navbar">
        <h2>QuickKart</h2>

        <div className="nav-buttons">
          <button onClick={() => setPage("products")}>
            Products
          </button>

          <button onClick={() => setPage("cart")}>
            🛒 Cart ({cartCount})
          </button>

          <button onClick={() => setPage("orders")}>
              📦 My Orders

          </button>
        </div>
      </nav>

      {page === "products" && (
        <Products onBuyNow={() => setPage("checkout")} />
      )}

      {page === "cart" && (
        <Cart
          onCheckout={() => setPage("checkout")}
        />
      )}

      {page === "checkout" && (
        <Checkout
          onBack={() => setPage("cart")}
          onSuccess={() => setPage("success")}
        />
      )}

      {page === "success" && (
        <OrderSuccess
        onContinue={() => setPage("products")}
      />
      )}

      {page === "orders" && <MyOrders />}
    </>
  );
}

export default App;