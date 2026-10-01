const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// ==========================================
// GET /api/products
// Lấy danh sách tất cả sản phẩm
// ==========================================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách sản phẩm",
      error: error.message
    });
  }
});


// ==========================================
// GET /api/products/:pid
// Lấy một sản phẩm theo pid
// ==========================================
router.get("/:pid", async (req, res) => {
  try {
    const product = await Product.findOne({
      pid: req.params.pid
    });

    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm"
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy sản phẩm",
      error: error.message
    });
  }
});


// ==========================================
// POST /api/products
// Thêm sản phẩm mới
// ==========================================
router.post("/", async (req, res) => {
  try {
    const { pid, pname, price, quantity } = req.body;

    const product = new Product({
      pid,
      pname,
      price,
      quantity
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({
      message: "Lỗi khi thêm sản phẩm",
      error: error.message
    });
  }
});


// ==========================================
// PUT /api/products/:pid
// Cập nhật sản phẩm
// ==========================================
router.put("/:pid", async (req, res) => {
  try {
    const { pname, price, quantity } = req.body;

    const product = await Product.findOneAndUpdate(
      { pid: req.params.pid },
      {
        pname,
        price,
        quantity
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm"
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Lỗi khi cập nhật sản phẩm",
      error: error.message
    });
  }
});


// ==========================================
// DELETE /api/products/:pid
// Xóa sản phẩm
// ==========================================
router.delete("/:pid", async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      pid: req.params.pid
    });

    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm"
      });
    }

    res.status(200).json({
      message: "Xóa sản phẩm thành công",
      product
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa sản phẩm",
      error: error.message
    });
  }
});


module.exports = router;