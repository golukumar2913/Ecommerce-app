const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    //  Token extract
    const token =
      req.cookies?.refreshToken || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access token missing" });
    }

    //  Verify token
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      // User inforamations
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Auth check failed", error });
  }
};
module.exports = authMiddleware;
