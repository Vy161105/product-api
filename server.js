const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();


// ==========================================
// Middleware
// ==========================================
app.use(express.json());


// ==========================================
// Route kiểm tra API
// ==========================================
app.get("/", (req, res) => {
  res.json({
    message: "Product API is running"
  });
});


// ==========================================
// Route kiểm tra System Health
// ==========================================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "System is healthy"
  });
});


// ==========================================
// Product routes
// ==========================================
app.use("/api/products", productRoutes);


// ==========================================
// Port
// ==========================================
const PORT = process.env.PORT || 3000;


// ==========================================
// Kết nối MongoDB
// ==========================================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:");
    console.error(error.message);
  });