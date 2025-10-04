const express = require("express");
const authMiddleware = require("../Middleware/auth");
const userRouter = express.Router();
const {
  getAllProduct,
  addFavourite,
  getFavourites,
  removeFavourite,
  addToCart,
  getCart,
  removeFromCart,
  updateQuantityCart,
  getProductsByCategory,
  showProfile,
  editProfile,
  productDetails,
} = require("../Controller/userController");

userRouter.get("/home", getAllProduct);
userRouter.post("/addFavourite/:id", authMiddleware, addFavourite);
userRouter.get("/favourites", authMiddleware, getFavourites);
userRouter.delete("/removeFavourite/:id", authMiddleware, removeFavourite);
userRouter.post("/addCart/:id", authMiddleware, addToCart);
userRouter.get("/getCart", authMiddleware, getCart);
userRouter.delete("/removeCart/:id", authMiddleware, removeFromCart);
userRouter.put("/updateQuantity", authMiddleware, updateQuantityCart);
userRouter.get("/productDetails/:id", productDetails);

userRouter.get("/productDetails/:id", productDetails);

userRouter.get("/products", getProductsByCategory);
userRouter.get("/profile", authMiddleware, showProfile);
userRouter.patch("/edit", authMiddleware, editProfile);

module.exports = userRouter;
