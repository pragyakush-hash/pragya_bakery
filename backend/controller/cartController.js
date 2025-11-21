import Cart from "../models/cartModel.js";

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      console.log(cart,"cart coming")
      const item = cart.items.find((i) => i.product === productId);
      console.log("item", item);
      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
      // Populate product data before returning
      const populatedCart = await Cart.findById(cart._id).populate(
        "items.product",
        "name price brand category image"
      );
      return res.status(200).json({ message: "Cart updated", cart: populatedCart });
    }
    const newCart = await Cart.create({
      user: userId,
      items: [{ product: productId, quantity }],
    });
    // Populate product data before returning
    const populatedCart = await Cart.findById(newCart._id).populate(
      "items.product",
      "name price brand category image"
    );
    return res
      .status(201)
      .json({ message: "Cart created and item added", cart: populatedCart });
  } catch (error) {
    console.error("error adding to cart", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const viewCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name price brand category image"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.status(200).json({
      message: "Cart fetched successfully",
      cart,
    });
    console.log("cart", cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



const deleteCartItem = async (req, res) => {
  try {
    const userId = req.userId;    
    const cartItemId = req.params.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== cartItemId
    );

    await cart.save();

    res.json({
      message: "Item deleted successfully",
      cart: cart.items, 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export default { addToCart, viewCart, deleteCartItem };
