import mongoose from "mongoose";
import Product from "./models/productModel.js";

await mongoose.connect("mongodb://localhost:27017/user");

console.log("Connected to MongoDB");

const sellers = [
  "6915cb2bb8a1c6ad244be82f",
  "6915cb88b8a1c6ad244be837",
  "6915cc04b8a1c6ad244be83f",
  "6915cc54b8a1c6ad244be847",
  "6915ccdab8a1c6ad244be853",
];

const products = [];

sellers.forEach((sellerId, i) => {
  for (let j = 1; j <= 1; j++) {
    products.push({
      name: `Seller${i + 1}-Product${j}`,
      description: "Delicious handmade bakery product",
      price: Math.floor(Math.random() * 500) + 100,
      category: "Cup cakes",
      brand: "Sweet Treats Bakery",
      stock: Math.floor(Math.random() * 50) + 10,
      rating: Math.floor(Math.random() * 5) + 1,
      image: "https://placehold.co/600x400?text=Bakery+Item", // sample placeholder image
      seller: sellerId,
    });
  }
});

try {
  await Product.insertMany(products);
  console.log("Products seeded successfully!");
} catch (err) {
  console.error(" Error seeding products:", err.message);
}

process.exit();
