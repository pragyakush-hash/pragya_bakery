import cloudinary from "../config/cloudinary.js";
import Product from "../models/productModel.js";

const createProduct = async (req, res) => {
  try {
    const sellerId = req.userId;
    const role = req.userRole;

    if (role !== "seller" && role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only sellers or admins can create products" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "product_images",
    });

    const newProduct = await Product.create({
      ...req.body,
      image: result.secure_url, // store this Cloudinary image URL
      seller: sellerId,
    });

    res
      .status(201)
      .json({ message: "Product created successfully", newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;
    let query = {};

    // Search by name, description, brand, or category
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by category
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const products = await Product.find(query).populate("seller", "name");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(req.params.id);
    console.log("productbyid", product);
    if (!product) return res.status(404).json({ message: "product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductAndDelete = async (req, res) => {
  try {
    const role = req.userRole;
    const userId = req.userId;
    
    // Find the product first
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    
    // Check if seller owns the product or is admin
    if (role === "seller" && product.seller.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You can delete only your own products" });
    }
    
    // Delete the product
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product is deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductAndUpdate = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Find the product first
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    
    // Check if seller owns the product
    if (product.seller.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You can update only your own products" });
    }
    
    // Handle image upload if provided
    let updateData = { ...req.body };
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "product_images",
      });
      updateData.image = result.secure_url;
    }
    
    const productUpdate = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    res.status(200).json({ 
      message: "Product is updated successfully!",
      product: productUpdate 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProductAndUpdateField = async (req, res) => {
  try {
    const productFieldUpdate = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!productFieldUpdate) {
      return res.status(404).json({ message: "product is not found" });
    }
    res.status(200).json({ message: "product field is update successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProductByPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      products,
      currentPage: page,
      totalPages,
      totalProducts,
    });
  } catch (error) {
    console.log("error pagination", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get seller's own products
const getSellerProducts = async (req, res) => {
  try {
    const sellerId = req.userId;
    const products = await Product.find({ seller: sellerId })
      .sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
  getProductAndDelete,
  getProductAndUpdate,
  getProductAndUpdateField,
  getProductByPagination,
  getSellerProducts,
};
