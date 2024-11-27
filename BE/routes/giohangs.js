// routes/giohang.js
/**
 * @swagger
 * tags:
 *   name: Giỏ Hàng
 *   description: API quản lý giỏ hàng của người dùng
 */

var express = require("express");
var router = express.Router();
var gioHangRouter = require("../models/Giohang");
var veRouter = require("../models/Ve");
var khuyenMaiRouter = require("../models/Khuyenmai");
var userRouter = require("../models/User");

/**
 * @swagger
 * /giohang/get-all:
 *   get:
 *     summary: Lấy danh sách tất cả giỏ hàng
 *     tags: [Giỏ Hàng]
 *     responses:
 *       200:
 *         description: Danh sách giỏ hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/get-all", async (req, res, next) => {
  try {
    const danhSachGioHang = await gioHangRouter
      .find()
      .populate("user")
      .populate("ve")
      .populate("khuyenMai");
    res.json({ status: true, danhSachGioHang });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi lấy danh sách giỏ hàng: " + error.message,
    });
  }
});

/**
 * @swagger
 * /giohang/add:
 *   post:
 *     summary: Tạo mới một giỏ hàng
 *     tags: [Giỏ Hàng]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               ve:
 *                 type: string
 *               khuyenMai:
 *                 type: string
 *               TrangThai:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tạo giỏ hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.post("/add", async (req, res, next) => {
  try {
    const { user, ve, khuyenMai, TrangThai } = req.body;

    // Kiểm tra user
    const userTonTai = await userRouter.findById(user);
    if (!userTonTai) {
      return res.json({ status: false, message: "Người dùng không tồn tại" });
    }

    // Kiểm tra vé
    const veTonTai = await veRouter.findById(ve);
    if (!veTonTai) {
      return res.json({ status: false, message: "Vé không tồn tại" });
    }

    // Kiểm tra khuyến mãi
    const khuyenMaiTonTai = await khuyenMaiRouter.findById(khuyenMai);
    if (!khuyenMaiTonTai) {
      return res.json({ status: false, message: "Khuyến mãi không tồn tại" });
    }

    const gioHangMoi = new gioHangRouter({ user, ve, khuyenMai, TrangThai });
    await gioHangMoi.save();

    res.json({
      status: true,
      message: "Tạo giỏ hàng mới thành công",
      data: gioHangMoi,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi tạo giỏ hàng mới: " + error.message,
    });
  }
});

/**
 * @swagger
 * /giohang/update:
 *   post:
 *     summary: Cập nhật thông tin giỏ hàng
 *     tags: [Giỏ Hàng]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               user:
 *                 type: string
 *               ve:
 *                 type: string
 *               khuyenMai:
 *                 type: string
 *               TrangThai:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật giỏ hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.post("/update", async (req, res, next) => {
  try {
    const { id, user, ve, khuyenMai, TrangThai } = req.body;

    // Kiểm tra giỏ hàng
    const gioHang = await gioHangRouter.findById(id);
    if (!gioHang) {
      return res.json({ status: false, message: "Giỏ hàng không tồn tại" });
    }

    // Kiểm tra user nếu được cập nhật
    if (user) {
      const userTonTai = await userRouter.findById(user);
      if (!userTonTai) {
        return res.json({ status: false, message: "Người dùng không tồn tại" });
      }
      gioHang.user = user;
    }

    // Kiểm tra vé nếu được cập nhật
    if (ve) {
      const veTonTai = await veRouter.findById(ve);
      if (!veTonTai) {
        return res.json({ status: false, message: "Vé không tồn tại" });
      }
      gioHang.ve = ve;
    }

    // Kiểm tra khuyến mãi nếu được cập nhật
    if (khuyenMai) {
      const khuyenMaiTonTai = await khuyenMaiRouter.findById(khuyenMai);
      if (!khuyenMaiTonTai) {
        return res.json({ status: false, message: "Khuyến mãi không tồn tại" });
      }
      gioHang.khuyenMai = khuyenMai;
    }

    gioHang.TrangThai = TrangThai;

    await gioHang.save();

    res.json({
      status: true,
      message: "Cập nhật giỏ hàng thành công",
      data: gioHang,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi cập nhật giỏ hàng: " + error.message,
    });
  }
});

/**
 * @swagger
 * /giohang/delete:
 *   post:
 *     summary: Xóa một giỏ hàng
 *     tags: [Giỏ Hàng]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Xóa giỏ hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.post("/delete", async (req, res, next) => {
  try {
    const { id } = req.body;

    const gioHangXoa = await gioHangRouter.findByIdAndDelete(id);
    if (!gioHangXoa) {
      return res.json({ status: false, message: "Giỏ hàng không tồn tại" });
    }

    res.json({
      status: true,
      message: "Xóa giỏ hàng thành công",
      data: gioHangXoa,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi xóa giỏ hàng: " + error.message,
    });
  }
});

/**
 * @swagger
 * /giohang/get-by-id:
 *   post:
 *     summary: Lấy thông tin một giỏ hàng theo ID
 *     tags: [Giỏ Hàng]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thông tin giỏ hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 gioHang:
 *                   type: object
 */
router.post("/get-by-id", async (req, res, next) => {
  try {
    const { id } = req.body;

    const gioHang = await gioHangRouter
      .findById(id)
      .populate("user")
      .populate("ve")
      .populate("khuyenMai");
    if (!gioHang) {
      return res.json({ status: false, message: "Giỏ hàng không tồn tại" });
    }

    res.json({ status: true, gioHang });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi lấy thông tin giỏ hàng: " + error.message,
    });
  }
});

module.exports = router;
