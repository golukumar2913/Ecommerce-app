const User = require("../db/model");
const RefreshToken = require("../db/refreshToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create AccessToken
const generateAccessToken = (user) =>
  jwt.sign(
    { userId: user._id, role: user.userType },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
  );

// Refresh token
const generateRefreshToken = (user) =>
  jwt.sign(
    { userId: user._id, role: user.userType },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
  );

// registeration
const registerUSer = async (req, res) => {
  const { name, email, dob, phone, password, confirmPassword, userType } =
    req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      dob,
      phone,
      password: hashedPassword,
      userType,
    });
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// login
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Password incorrect" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        role: user.userType,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// refresh
const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const storedToken = await RefreshToken.findOne({ token });
    if (!storedToken)
      return res.status(403).json({ message: "Invalid refresh token" });

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) {
        await RefreshToken.findOneAndDelete({ token });
        return res
          .status(403)
          .json({ message: "Refresh token expired or invalid" });
      }

      const accessToken = generateAccessToken(user);
      res.json({ success: true, accessToken });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// logout
const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res
        .status(400)
        .json({ success: false, message: "No refresh token found" });
    }

    // Remove refresh token from DB
    await RefreshToken.deleteOne({ token: refreshToken });

    // Clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,

      secure: true,
      sameSite: "None",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// forget password
const forgetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // validation
    if (!email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match." });
    }

    //  user exist?
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // hash new password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error("Forget Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

module.exports = {
  registerUSer,
  LoginUser,
  refreshToken,
  logout,
  forgetPassword,
};
