const express = require("express");
const authMiddleware = require("../Middleware/auth");
const adminRouter = express.Router();
const {
  readData,
  deleteUser,
  updateUserType,
  updateAll,
} = require("../Controller/AdminController");
const authorize = require("../Middleware/autorized");

adminRouter.get("/users", authMiddleware, authorize("admin"), readData);
adminRouter.delete(
  "/usersDelete/:id",
  authMiddleware,
  authorize("admin"),
  deleteUser
);
adminRouter.patch(
  "/usersUpdate/:id",
  authMiddleware,
  authorize("admin"),
  updateUserType
);
adminRouter.put(
  "/usersUpdates/:id",
  authMiddleware,
  authorize("admin"),
  updateAll
);
module.exports = adminRouter;
