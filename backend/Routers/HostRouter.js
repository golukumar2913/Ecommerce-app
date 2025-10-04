const express = require("express");
const {
  createProduct,
  getSellerProducts,
  deleteProduct,
  getProductById,
  updateProduct,
} = require("../Controller/HostController");
const authMiddleware = require("../Middleware/auth");
const authorize = require("../Middleware/autorized");

const hostRouter = express.Router();

hostRouter.post(
  "/addProduct",
  authMiddleware,
  authorize("seller"),

  createProduct
);
hostRouter.get(
  "/Product",
  authMiddleware,
  authorize("seller"),
  getSellerProducts
);
hostRouter.get(
  "/product/:id",
  authMiddleware,
  authorize("seller"),
  getProductById
);
hostRouter.put(
  "/updateProduct/:id",
  authMiddleware,
  authorize("seller"),
  updateProduct
);
hostRouter.delete(
  "/deleteProduct/:id",
  authMiddleware,
  authorize("seller"),
  deleteProduct
);
module.exports = hostRouter;
