import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      require: [true, "product description is required"],
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: [true, "category is required"],
      trim: true,
    },
    brand: {
      type: String,
      require: [true, "brand is required"],
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock count is required"],
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating cannot exceed 5"],
    },
    image: {
      type: String,
      required: [true, "Product image URL is required"],
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
