import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

// 1. Seller product count
const getSellerTotalProducts = async (req, res) => {
  try {
    const sellerId = req.userId; // Get from authenticated user
    const totalProducts = await Product.countDocuments({ seller: sellerId });
    res.json({ totalProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSellerTotalOrders = async (req, res) => {
  try {
    const sellerId = req.userId;
    // Get seller's product IDs
    const sellerProducts = await Product.find({ seller: sellerId }).select("_id");
    const productIds = sellerProducts.map((p) => p._id);
    
    // Find orders containing seller's products
    const orders = await Order.find({
      "products.product": { $in: productIds },
    });
    
    res.json({ totalOrders: orders.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSellerRevenue = async (req, res) => {
  try {
    const sellerId = req.userId;
    // Get seller's product IDs
    const sellerProducts = await Product.find({ seller: sellerId }).select("_id");
    const productIds = sellerProducts.map((p) => p._id);
    
    // Find orders containing seller's products
    const orders = await Order.find({
      "products.product": { $in: productIds },
    }).populate("products.product");

    let totalRevenue = 0;
    for (const order of orders) {
      // Calculate revenue only for seller's products in each order
      for (const item of order.products) {
        if (productIds.includes(item.product._id)) {
          const product = await Product.findById(item.product._id);
          totalRevenue += (product.price * item.quantity);
        }
      }
    }

    res.json({ totalRevenue: totalRevenue.toFixed(2) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Combined stats endpoint
const getSellerStats = async (req, res) => {
  try {
    const sellerId = req.userId;
    
    // Get total products
    const totalProducts = await Product.countDocuments({ seller: sellerId });
    
    // Get seller's product IDs
    const sellerProducts = await Product.find({ seller: sellerId }).select("_id");
    const productIds = sellerProducts.map((p) => p._id);
    
    // Get orders
    const orders = await Order.find({
      "products.product": { $in: productIds },
    }).populate("products.product").populate("user", "name email");

    let totalRevenue = 0;
    for (const order of orders) {
      for (const item of order.products) {
        if (productIds.includes(item.product._id)) {
          const product = await Product.findById(item.product._id);
          totalRevenue += (product.price * item.quantity);
        }
      }
    }

    res.json({
      totalProducts,
      totalOrders: orders.length,
      totalRevenue: totalRevenue.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getSellerTotalProducts,
  getSellerTotalOrders,
  getSellerRevenue,
  getSellerStats,
};
