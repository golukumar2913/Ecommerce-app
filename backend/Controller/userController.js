const User = require("../db/model");
const Product = require("../db/productModel");

const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

const addFavourite = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not Found" });
    }
    if (!user.favourites.includes(productId)) {
      user.favourites.push(productId);
      await user.save();
    } else {
      console.log("product already added");
    }
    res.status(200).json({ success: true, message: "Product added" });
  } catch (err) {
    console.error(err);
  }
};
const getFavourites = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).populate("favourites");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      favourites: user.favourites,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const removeFavourite = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.favourites = user.favourites.filter(
      (fav) => fav.toString() !== productId
    );
    await user.save();

    res.status(200).json({ success: true, message: "Product removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Add to Cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.params.id;
    const { quantity } = req.body;

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      user.cart.push({ product: productId, quantity: quantity || 1 });
    }

    await user.save();

    await user.populate("cart.product");

    res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).populate("cart.product");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      cart: user.cart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Remove from Cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = req.params.id;

    const user = await User.findById(userId);
    user.cart = user.cart.filter((item) => item.product.toString() !== id);
    await user.save();

    res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Quantity
const updateQuantityCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, action } = req.body;

    const user = await User.findById(userId);

    const item = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res
        .status(400)
        .json({ success: false, message: "Item not in cart" });
    }

    if (action === "increment") {
      item.quantity += 1;
    } else if (action === "decrement") {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        user.cart = user.cart.filter(
          (item) => item.product.toString() !== productId
        );
      }
    }

    await user.save();
    await user.populate("cart.product");

    res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const productDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(400).json({ success: false, message: "product not found" });
    }
    res.status(200).json({ success: true, message: "product here", product });
  } catch (err) {
    console.error(err);
  }
};
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.query.category;
    if (!category)
      return res.status(400).json({ message: "Category is required" });

    const products = await Product.find({
      category: { $regex: new RegExp(`^${category.trim()}$`, "i") },
    });

    if (!products || products.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products by category" });
  }
};

const showProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId)
      return res.status(400).json({ message: "User id missing in request" });
    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("getMyProfile error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const editProfile = async (req, res) => {};

module.exports = {
  getAllProduct,
  addFavourite,
  getFavourites,
  removeFavourite,
  addToCart,
  getCart,
  removeFromCart,
  updateQuantityCart,
  productDetails,
  getProductsByCategory,
  showProfile,
  editProfile,
};
