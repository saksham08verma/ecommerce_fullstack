import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductDetails from "./ProductDetails";

function Products({ onBuyNow }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("All");
  const [rating, setRating] = useState("All");
  const [sort, setSort] = useState("default");

  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Product details page
  if (selectedProduct) {
    return (
      <ProductDetails
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        onBuyNow={onBuyNow}
      />
    );
  }

  if (loading) {
    return (
      <div className="status-message">
        <h2>Loading products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-message">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Search + filters
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    let matchesPrice = true;

    if (price === "under1000") {
      matchesPrice = product.price < 1000;
    }

    if (price === "1000-2000") {
      matchesPrice =
        product.price >= 1000 &&
        product.price <= 2000;
    }

    if (price === "2000-5000") {
      matchesPrice =
        product.price > 2000 &&
        product.price <= 5000;
    }

    if (price === "above5000") {
      matchesPrice = product.price > 5000;
    }

    let matchesRating = true;

    if (rating === "4") {
      matchesRating = product.rating >= 4;
    }

    if (rating === "3") {
      matchesRating = product.rating >= 3;
    }

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesRating
    );
  });

  // Sorting
  if (sort === "low") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "rating") {
    filteredProducts.sort(
      (a, b) => b.rating - a.rating
    );
  }

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setPrice("All");
    setRating("All");
    setSort("default");
  };

  return (
    <div className="products-page">

      {/* Search + sorting */}
      <div className="top-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="sort-select"
        >
          <option value="default">Sort By</option>
          <option value="low">
            Price: Low to High
          </option>
          <option value="high">
            Price: High to Low
          </option>
          <option value="rating">
            Customer Rating
          </option>
        </select>
      </div>

      {/* Main content */}
      <div className="products-layout">

        {/* Sidebar */}
        <aside className="filter-sidebar">
          <div className="filter-header">
            <h2>Filters</h2>

            <button onClick={clearFilters}>
              Clear All
            </button>
          </div>

          <hr />

          {/* Categories */}
          <div className="filter-section">
            <h3>Categories</h3>

            <label>
              <input
                type="radio"
                name="category"
                checked={category === "All"}
                onChange={() => setCategory("All")}
              />
              All
            </label>

            <label>
              <input
                type="radio"
                name="category"
                checked={category === "Electronics"}
                onChange={() =>
                  setCategory("Electronics")
                }
              />
              Electronics
            </label>

            <label>
              <input
                type="radio"
                name="category"
                checked={category === "Fashion"}
                onChange={() =>
                  setCategory("Fashion")
                }
              />
              Fashion
            </label>

            <label>
              <input
                type="radio"
                name="category"
                checked={category === "Mobiles"}
                onChange={() =>
                  setCategory("Mobiles")
                }
              />
              Mobiles
            </label>

            <label>
              <input
                type="radio"
                name="category"
                checked={category === "Accessories"}
                onChange={() =>
                  setCategory("Accessories")
                }
              />
              Accessories
            </label>
          </div>

          <hr />

          {/* Price */}
          <div className="filter-section">
            <h3>Price</h3>

            <label>
              <input
                type="radio"
                name="price"
                checked={price === "All"}
                onChange={() => setPrice("All")}
              />
              All
            </label>

            <label>
              <input
                type="radio"
                name="price"
                checked={price === "under1000"}
                onChange={() =>
                  setPrice("under1000")
                }
              />
              Under ₹1,000
            </label>

            <label>
              <input
                type="radio"
                name="price"
                checked={price === "1000-2000"}
                onChange={() =>
                  setPrice("1000-2000")
                }
              />
              ₹1,000 - ₹2,000
            </label>

            <label>
              <input
                type="radio"
                name="price"
                checked={price === "2000-5000"}
                onChange={() =>
                  setPrice("2000-5000")
                }
              />
              ₹2,000 - ₹5,000
            </label>

            <label>
              <input
                type="radio"
                name="price"
                checked={price === "above5000"}
                onChange={() =>
                  setPrice("above5000")
                }
              />
              Above ₹5,000
            </label>
          </div>

          <hr />

          {/* Rating */}
          <div className="filter-section">
            <h3>Customer Rating</h3>

            <label>
              <input
                type="radio"
                name="rating"
                checked={rating === "All"}
                onChange={() => setRating("All")}
              />
              All ratings
            </label>

            <label>
              <input
                type="radio"
                name="rating"
                checked={rating === "4"}
                onChange={() => setRating("4")}
              />
              ⭐ 4★ & above
            </label>

            <label>
              <input
                type="radio"
                name="rating"
                checked={rating === "3"}
                onChange={() => setRating("3")}
              />
              ⭐ 3★ & above
            </label>
          </div>
        </aside>

        {/* Products area */}
        <section className="products-section">

          {/* Compact category bar */}
          <div className="category-bar">
            <button
              className={
                category === "All" ? "active" : ""
              }
              onClick={() => setCategory("All")}
            >
              All
            </button>

            <button
              className={
                category === "Electronics"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setCategory("Electronics")
              }
            >
              📱 Electronics
            </button>

            <button
              className={
                category === "Fashion"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setCategory("Fashion")
              }
            >
              👕 Fashion
            </button>

            <button
              className={
                category === "Accessories"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setCategory("Accessories")
              }
            >
              🎒 Accessories
            </button>

            <button
              className={
                category === "Wearables"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setCategory("Wearables")
              }
            >
              ⌚ Wearables
            </button>
          </div>

          {/* Product count */}
          <div className="product-count">
            <strong>
              {filteredProducts.length}
            </strong>{" "}
            products found
          </div>

          {/* Product grid */}
          <main className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onView={() =>
                    setSelectedProduct(product)
                  }
                />
              ))
            ) : (
              <div className="no-products">
                <h2>No products found 😕</h2>
                <p>
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </main>

        </section>
      </div>
    </div>
  );
}

export default Products;