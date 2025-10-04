const express = require("express");
const authRouter = express.Router();
const {
  registerUSer,
  LoginUser,
  refreshToken,
  logout,
  forgetPassword,
} = require("../Controller/AuthController");

authRouter.post("/register", registerUSer);
authRouter.post("/login", LoginUser);
authRouter.post("/refresh", refreshToken);
authRouter.post("/logout", logout);
authRouter.patch("/forgetPassword", forgetPassword);

module.exports = authRouter;
