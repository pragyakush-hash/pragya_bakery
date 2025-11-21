import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// 1. Count total users
const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    res.json({ totalUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTotalOrders = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.json({ totalOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTotalRevenue = async (req, res) => {
  try {
    const orders = await Order.find();
    let totalRevenue = 0;

    for (const order of orders) {
      totalRevenue += order.totalAmount;
    }

    res.json({ totalRevenue: totalRevenue.toFixed(2) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTotalProducts = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    res.json({ totalProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTotalSellers = async (req, res) => {
  try {
    const totalSellers = await User.countDocuments({ role: "seller" });
    res.json({ totalSellers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Combined stats endpoint
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalSellers = await User.countDocuments({ role: "seller" });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    
    const orders = await Order.find();
    let totalRevenue = 0;
    for (const order of orders) {
      totalRevenue += order.totalAmount;
    }

    res.json({
      totalUsers,
      totalSellers,
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenue.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getTotalUsers,
  getTotalOrders,
  getTotalRevenue,
  getTotalProducts,
  getTotalSellers,
  getAdminStats,
};
