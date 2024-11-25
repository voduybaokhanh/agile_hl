/**
 * @swagger
 * tags:
 *   name: ThanhToan
 *   description: API quản lý thanh toán
 */

var express = require("express");
var router = express.Router();
var thanhtoanRouter = require("../models/Thanhtoan");
var veRouter = require("../models/Ve");

// Lấy danh sách tất cả các thanh toán
// http://localhost:3000/thanhtoan/get-all
/**
 * @swagger
 * /thanhtoan/get-all:
 *   get:
 *     summary: Lấy danh sách tất cả các thanh toán
 *     tags: [ThanhToan]
 *     responses:
 *       200:
 *         description: Danh sách thanh toán
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 danhSachThanhToan:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("/get-all", async (req, res, next) => {
  try {
    const danhSachThanhToan = await thanhtoanRouter.find().populate("ve");
    res.json({ status: true, danhSachThanhToan });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi lấy danh sách thanh toán: " + error.message,
    });
  }
});

// Tạo mới một thanh toán
// http://localhost:3000/thanhtoan/add
/**
 * @swagger
 * /thanhtoan/add:
 *   post:
 *     summary: Tạo mới một thanh toán
 *     tags: [ThanhToan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               PhuongThucThanhToan:
 *                 type: string
 *               NgayThanhToan:
 *                 type: string
 *               TrangThai:
 *                 type: string
 *               ve:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thông tin thanh toán mới tạo
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
    const { PhuongThucThanhToan, NgayThanhToan, TrangThai, ve } = req.body;

    // Kiểm tra vé
    const veTonTai = await veRouter.findById(ve);
    if (!veTonTai) {
      return res.json({ status: false, message: "Vé không tồn tại" });
    }

    const thanhToanMoi = new thanhtoanRouter({
      PhuongThucThanhToan,
      NgayThanhToan,
      TrangThai,
      ve,
    });
    await thanhToanMoi.save();

    res.json({
      status: true,
      message: "Tạo thanh toán mới thành công",
      data: thanhToanMoi,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi tạo thanh toán mới: " + error.message,
    });
  }
});

// Cập nhật thông tin thanh toán
// http://localhost:3000/thanhtoan/update
/**
 * @swagger
 * /thanhtoan/update:
 *   post:
 *     summary: Cập nhật thông tin thanh toán
 *     tags: [ThanhToan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               PhuongThucThanhToan:
 *                 type: string
 *               NgayThanhToan:
 *                 type: string
 *               TrangThai:
 *                 type: string
 *               ve:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thông tin thanh toán sau khi cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/update", async (req, res, next) => {
  try {
    const { id, PhuongThucThanhToan, NgayThanhToan, TrangThai, ve } = req.body;

    const thanhToan = await thanhtoanRouter.findById(id);
    if (!thanhToan) {
      return res.json({ status: false, message: "Thanh toán không tồn tại" });
    }

    if (ve) {
      const veTonTai = await veRouter.findById(ve);
      if (!veTonTai) {
        return res.json({ status: false, message: "Vé không tồn tại" });
      }
      thanhToan.ve = ve;
    }

    thanhToan.PhuongThucThanhToan = PhuongThucThanhToan;
    thanhToan.NgayThanhToan = NgayThanhToan;
    thanhToan.TrangThai = TrangThai;

    await thanhToan.save();

    res.json({
      status: true,
      message: "Cập nhật thanh toán thành công",
      data: thanhToan,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi cập nhật thanh toán: " + error.message,
    });
  }
});

// Xóa một thanh toán
// http://localhost:3000/thanhtoan/delete
/**
 * @swagger
 * /thanhtoan/delete:
 *   post:
 *     summary: Xóa một thanh toán
 *     tags: [ThanhToan]
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
 *         description: Thông tin thanh toán đã xóa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/delete", async (req, res, next) => {
  try {
    const { id } = req.body;

    const thanhToanXoa = await thanhtoanRouter.findByIdAndDelete(id);
    if (!thanhToanXoa) {
      return res.json({ status: false, message: "Thanh toán không tồn tại" });
    }

    res.json({
      status: true,
      message: "Xóa thanh toán thành công",
      data: thanhToanXoa,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi xóa thanh toán: " + error.message,
    });
  }
});

// Lấy thông tin một thanh toán
// http://localhost:3000/thanhtoan/get-by-id
/**
 * @swagger
 * /thanhtoan/get-by-id:
 *   post:
 *     summary: Lấy thông tin một thanh toán
 *     tags: [ThanhToan]
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
 *         description: Thông tin thanh toán
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/get-by-id", async (req, res, next) => {
  try {
    const { id } = req.body;

    const thanhToan = await thanhtoanRouter.findById(id).populate("ve");
    if (!thanhToan) {
      return res.json({ status: false, message: "Thanh toán không tồn tại" });
    }

    res.json({ status: true, thanhToan });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi lấy thông tin thanh toán: " + error.message,
    });
  }
});

module.exports = router;
