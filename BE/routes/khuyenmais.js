// routes/khuyenmai.js
/**
 * @swagger
 * tags:
 *   name: Khuyến Mãi
 *   description: API quản lý các khuyến mãi
 */

var express = require("express");
var router = express.Router();
var khuyenmaiRouter = require("../models/Khuyenmai");
var adminRouter = require("../models/Admin");

/**
 * @swagger
 * /khuyenmai/list:
 *   get:
 *     summary: Lấy danh sách tất cả khuyến mãi
 *     tags: [Khuyến Mãi]
 *     responses:
 *       200:
 *         description: Danh sách các khuyến mãi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/list", async (req, res) => {
  try {
    const promotions = await khuyenmaiRouter
      .find()
      .populate("admin", "name email");
    res.json(promotions);
  } catch (err) {
    res.json({ status: false, message: "Lỗi server: " + err.message });
  }
});

/**
 * @swagger
 * /khuyenmai/detail:
 *   post:
 *     summary: Lấy chi tiết khuyến mãi theo ID
 *     tags: [Khuyến Mãi]
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
 *         description: Thông tin chi tiết khuyến mãi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: object
 */
router.post("/detail", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.json({ status: false, message: "ID không được để trống" });
    }
    const promotion = await khuyenmaiRouter
      .findById(id)
      .populate("admin", "ten email");
    if (!promotion) {
      return res.json({ status: false, message: "Khuyến mãi không tồn tại" });
    }
    res.json(promotion);
  } catch (err) {
    res.json({ status: false, message: "Lỗi server: " + err.message });
  }
});

/**
 * @swagger
 * /khuyenmai/add:
 *   post:
 *     summary: Tạo khuyến mãi mới
 *     tags: [Khuyến Mãi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tieuDe:
 *                 type: string
 *               noiDung:
 *                 type: string
 *               mucGiamGia:
 *                 type: number
 *               loaiKhuyenMai:
 *                 type: string
 *               maKhuyenMai:
 *                 type: string
 *               ngayBatDau:
 *                 type: string
 *                 format: date
 *               ngayKetThuc:
 *                 type: string
 *                 format: date
 *               admin:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tạo khuyến mãi thành công
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
router.post("/add", async (req, res) => {
  try {
    const {
      tieuDe,
      noiDung,
      mucGiamGia,
      loaiKhuyenMai,
      maKhuyenMai,
      ngayBatDau,
      ngayKetThuc,
      admin,
    } = req.body;

    if (
      !tieuDe ||
      !noiDung ||
      !mucGiamGia ||
      !loaiKhuyenMai ||
      !maKhuyenMai ||
      !ngayBatDau ||
      !ngayKetThuc ||
      !admin
    ) {
      return res.json({
        status: false,
        message: "Thông tin không được để trống",
      });
    }

    const adminExists = await adminRouter.findById(admin);
    if (!adminExists) {
      return res.json({ status: false, message: "Người dùng không tồn tại" });
    }

    const newPromotion = new khuyenmaiRouter({
      tieuDe,
      noiDung,
      mucGiamGia,
      loaiKhuyenMai,
      maKhuyenMai,
      ngayBatDau,
      ngayKetThuc,
      admin,
    });

    await newPromotion.save();
    res.json({
      status: true,
      message: "Tạo khuyến mãi thành công",
      data: newPromotion,
    });
  } catch (err) {
    res.json({
      status: false,
      message: "Lỗi khi tạo khuyến mãi: " + err.message,
    });
  }
});

/**
 * @swagger
 * /khuyenmai/update:
 *   put:
 *     summary: Cập nhật thông tin khuyến mãi
 *     tags: [Khuyến Mãi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               tieuDe:
 *                 type: string
 *               noiDung:
 *                 type: string
 *               mucGiamGia:
 *                 type: number
 *               loaiKhuyenMai:
 *                 type: string
 *               maKhuyenMai:
 *                 type: string
 *               ngayBatDau:
 *                 type: string
 *                 format: date
 *               ngayKetThuc:
 *                 type: string
 *                 format: date
 *               admin:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật khuyến mãi thành công
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
router.put("/update", async (req, res) => {
  try {
    const {
      id,
      tieuDe,
      noiDung,
      mucGiamGia,
      loaiKhuyenMai,
      maKhuyenMai,
      ngayBatDau,
      ngayKetThuc,
      admin,
    } = req.body;

    if (!id) {
      return res.json({ status: false, message: "ID không được để trống" });
    }

    const promotion = await khuyenmaiRouter.findById(id);
    if (!promotion) {
      return res.json({ status: false, message: "Khuyến mãi không tồn tại" });
    }

    if (admin) {
      const adminExists = await adminRouter.findById(admin);
      if (!adminExists) {
        return res.json({ status: false, message: "Người dùng không tồn tại" });
      }
    }

    const updatedPromotion = await khuyenmaiRouter.findByIdAndUpdate(
      id,
      {
        tieuDe,
        noiDung,
        mucGiamGia,
        loaiKhuyenMai,
        maKhuyenMai,
        ngayBatDau,
        ngayKetThuc,
        admin,
      },
      { new: true, runValidators: true }
    );

    res.json({
      status: true,
      message: "Cập nhật thành công",
      data: updatedPromotion,
    });
  } catch (err) {
    res.json({ status: false, message: "Lỗi khi cập nhật: " + err.message });
  }
});

/**
 * @swagger
 * /khuyenmai/delete:
 *   delete:
 *     summary: Xóa khuyến mãi
 *     tags: [Khuyến Mãi]
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
 *         description: Xóa khuyến mãi thành công
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
router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.json({ status: false, message: "ID không được để trống" });
    }

    const deletedPromotion = await khuyenmaiRouter.findByIdAndDelete(id);
    if (!deletedPromotion) {
      return res.json({ status: false, message: "Khuyến mãi không tồn tại" });
    }

    res.json({ status: true, message: "Xóa khuyến mãi thành công" });
  } catch (err) {
    res.json({ status: false, message: "Lỗi khi xóa: " + err.message });
  }
});

module.exports = router;
