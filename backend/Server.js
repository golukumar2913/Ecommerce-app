const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./db/DbConnect");
const cors = require("cors");
const cookie = require("cookie-parser");
const authRouter = require("./Routers/AuthRouter");
const adminRouter = require("./Routers/AdminRouter");
const hostRouter = require("./Routers/HostRouter");
const userRouter = require("./Routers/UserRouter");

const app = express();

// middle Ware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookie());

// authentication routes
app.use("/auth", authRouter);

// adim data
app.use("/admin", adminRouter);
// seller Route
app.use("/seller", hostRouter);
// user Route
app.use("/user", userRouter);

const port = process.env.PORT;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
