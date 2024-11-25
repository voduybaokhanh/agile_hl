/**
 * @swagger
 * tags:
 *   name: PhongChieu
 *   description: API quản lý các phòng chiếu
 */

var express = require('express');
var router = express.Router();
var rapRouter = require("../models/Rap");
var phongchieuRouter = require("../models/PhongChieu");

/**
 * @swagger
 * /phongchieu/get-all:
 *   get:
 *     summary: Lấy danh sách tất cả các phòng chiếu
 *     tags: [PhongChieu]
 *     responses:
 *       200:
 *         description: Danh sách các phòng chiếu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 danhSachPhongChieu:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("/get-all", async (req, res, next) => {
  try {
    const danhSachPhongChieu = await phongchieuRouter.find().populate("rap");
    res.json({ status: true, danhSachPhongChieu });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi lấy danh sách phòng chiếu: " + error.message,
    });
  }
});

/**
 * @swagger
 * /phongchieu/add:
 *   post:
 *     summary: Tạo mới một phòng chiếu
 *     tags: [PhongChieu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TenPhongChieu:
 *                 type: string
 *               SoGhe:
 *                 type: integer
 *               rap:
 *                 type: string
 *               TrangThai:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thông tin phòng chiếu mới tạo
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
    const { TenPhongChieu, SoGhe, rap, TrangThai } = req.body;

    const rapTonTai = await rapRouter.findById(rap);
    if (!rapTonTai) {
      return res.json({ status: false, message: "Rạp không tồn tại" });
    }

    const phongChieuMoi = new phongchieuRouter({ TenPhongChieu, SoGhe, rap, TrangThai });
    await phongChieuMoi.save();
    res.json({
      status: true,
      message: "Tạo phòng chiếu mới thành công",
      data: phongChieuMoi,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi tạo phòng chiếu mới: " + error.message,
    });
  }
});

/**
 * @swagger
 * /phongchieu/update:
 *   post:
 *     summary: Cập nhật thông tin phòng chiếu
 *     tags: [PhongChieu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               TenPhongChieu:
 *                 type: string
 *               SoGhe:
 *                 type: integer
 *               rap:
 *                 type: string
 *               TrangThai:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thông tin phòng chiếu sau khi cập nhật
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
    const { id, TenPhongChieu, SoGhe, rap, TrangThai } = req.body;

    const phongChieu = await phongchieuRouter.findById(id);
    if (!phongChieu) {
      return res.json({ status: false, message: "Phòng chiếu không tồn tại" });
    }

    if (rap) {
      const rapTonTai = await rapRouter.findById(rap);
      if (!rapTonTai) {
        return res.json({ status: false, message: "Rạp không tồn tại" });
      }
      phongChieu.rap = rap;
    }

    phongChieu.TenPhongChieu = TenPhongChieu;
    phongChieu.SoGhe = SoGhe;
    phongChieu.TrangThai = TrangThai;

    await phongChieu.save();
    res.json({
      status: true,
      message: "Cập nhật phòng chiếu thành công",
      data: phongChieu,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi cập nhật phòng chiếu: " + error.message,
    });
  }
});

/**
 * @swagger
 * /phongchieu/delete:
 *   post:
 *     summary: Xóa một phòng chiếu
 *     tags: [PhongChieu]
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
 *         description: Thông tin phòng chiếu đã xóa
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
    const phongChieuXoa = await phongchieuRouter.findByIdAndDelete(id);
    if (!phongChieuXoa) {
      return res.json({ status: false, message: "Phòng chiếu không tồn tại" });
    }
    res.json({
      status: true,
      message: "Xóa phòng chiếu thành công",
      data: phongChieuXoa,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi xóa phòng chiếu: " + error.message,
    });
  }
});

/**
 * @swagger
 * /phongchieu/get-by-id:
 *   post:
 *     summary: Lấy thông tin một phòng chiếu theo ID
 *     tags: [PhongChieu]
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
 *         description: Thông tin phòng chiếu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 phongChieu:
 *                   type: object
 */
router.post("/get-by-id", async (req, res, next) => {
  try {
    const { id } = req.body;
    const phongChieu = await phongchieuRouter.findById(id).populate("rap");
    if (!phongChieu) {
      return res.json({ status: false, message: "Phòng chiếu không tồn tại" });
    }
    res.json({ status: true, phongChieu });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi lấy thông tin phòng chiếu: " + error.message,
    });
  }
});

module.exports = router;
