const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    dob: { type: Date },
    phone: { type: String },
    password: { type: String, required: true },
    userType: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
    },
    favourites: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", registerSchema);

module.exports = User;
