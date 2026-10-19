const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "Samsung Galaxy Smartphone",
    description: "Modern smartphone with a high-quality display and powerful performance.",
    price: 14999,
    originalPrice: 17999,
    category: "Mobiles",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    rating: 4.4,
    reviews: 1250,
    stock: 20,
  },
  {
    name: "Wireless Bluetooth Headphones",
    description: "Comfortable wireless headphones with clear sound quality.",
    price: 1999,
    originalPrice: 2999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    rating: 4.3,
    reviews: 890,
    stock: 35,
  },
  {
    name: "Men's Casual T-Shirt",
    description: "Comfortable cotton casual t-shirt for everyday wear.",
    price: 599,
    originalPrice: 999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    rating: 4.2,
    reviews: 640,
    stock: 50,
  },
  {
    name: "Laptop Backpack",
    description: "Durable backpack suitable for laptops, college and travel.",
    price: 899,
    originalPrice: 1499,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    rating: 4.5,
    reviews: 420,
    stock: 30,
  },
  {
    name: "Smart Watch",
    description: "Smart watch with fitness tracking and notification features.",
    price: 2499,
    originalPrice: 3999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    rating: 4.1,
    reviews: 730,
    stock: 25,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("✅ Products added successfully");

    process.exit();
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedProducts();