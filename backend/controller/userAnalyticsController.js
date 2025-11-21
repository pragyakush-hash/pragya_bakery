import Order from "../models/orderModel.js";

const getUserOrderHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserTotalSpent = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId });

    let totalSpent = 0;
    for (const order of orders) {
      totalSpent += order.totalAmount;
    }

    res.json({ totalSpent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { getUserOrderHistory, getUserTotalSpent };
