const Product = require("../db/productModel");

// create product
const createProduct = async (req, res) => {
  try {
    const {
      productName,
      brandName,
      category,
      price,
      sellingPrice,
      description,
      productImage,
    } = req.body;

    if ("seller" !== req.user.role) {
      console.log("only seller create a product");
    }

    if (Number(sellingPrice) > Number(price)) {
      return res.status(400).json({
        success: false,
        message: "Selling price cannot be greater than original price",
      });
    }

    //  Save product
    const newProduct = new Product({
      productName,
      brandName,
      category,
      description,
      price,
      sellingPrice,
      productImage,
      createdBy: req.user.userId,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      product: newProduct,
    });
  } catch (error) {
    console.error("❌ Create Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

const getSellerProducts = async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res
        .status(403)
        .json({ message: "Only sellers can view their products" });
    }

    const products = await Product.find({
      createdBy: req.user.userId,
    }).populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      message: "Seller products fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching seller products",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id, seller: req.user._id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found or not authorized",
      });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (err) {
    console.error("Delete Product Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while deleting product",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    if (product.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productName,
      brandName,
      category,
      price,
      sellingPrice,
      description,
      productImage,
    } = req.body;

    // validation
    if (Number(sellingPrice) > Number(price)) {
      return res.status(400).json({
        success: false,
        message: "Selling price cannot be greater than original price",
      });
    }

    // update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        productName,
        brandName,
        category,
        description,
        price,
        sellingPrice,
        productImage,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("❌ Update Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getSellerProducts,
  deleteProduct,
  getProductById,
  updateProduct,
};
