const express = require("express");
const User = require("../db/model");

// show all user data in admin page
const readData = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Internal server error" });
  }
  res.status(200).json({ success: true, message: "user deleted" });
};

// update user one fild userType
const updateUserType = async (req, res) => {
  const { id } = req.params;

  try {
    const userType = req.body.userType;

    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: { userType } },
      { new: true }
    );
    if (!updateUser) {
      return res
        .status(404)
        .json({ success: false, message: "user Not found", updateUser });
    }
    res.status(200).json({ success: true, message: "false" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update all filed
const updateAll = async (req, res) => {
  const { id } = req.params;

  try {
    const data = req.body;
    console.log(data);
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    if (!updateUser) {
      return res
        .status(404)
        .json({ success: false, message: "user Not found" });
    }
    res.status(200).json({ success: true, message: "false", updateUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { readData, deleteUser, updateUserType, updateAll };
