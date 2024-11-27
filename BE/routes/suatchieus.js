/**
 * @swagger
 * tags:
 *   name: SuatChieu
 *   description: API quản lý suất chiếu
 */

var express = require("express");
var router = express.Router();
var suatChieuRouter = require("../models/Suatchieu");
var rapRouter = require("../models/Rap");
var phimRouter = require("../models/Phim");

// Lấy danh sách tất cả các suất chiếu
// http://localhost:3000/suatchieu/get-all
/**
 * @swagger
 * /suatchieu/get-all:
 *   get:
 *     summary: Lấy danh sách tất cả các suất chiếu
 *     tags: [SuatChieu]
 *     responses:
 *       200:
 *         description: Danh sách các suất chiếu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 danhSachSuatChieu:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("/get-all", async (req, res, next) => {
  try {
    const danhSachSuatChieu = await suatChieuRouter.find()
      .populate("phim")
      .populate("rap");
    res.json({ status: true, danhSachSuatChieu });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi lấy danh sách suất chiếu: " + error.message,
    });
  }
});

// Tạo mới một suất chiếu
// http://localhost:3000/suatchieu/add
/**
 * @swagger
 * /suatchieu/add:
 *   post:
 *     summary: Tạo mới một suất chiếu
 *     tags: [SuatChieu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               thoiGianChieu:
 *                 type: string
 *               phim:
 *                 type: string
 *               rap:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thông tin suất chiếu mới tạo
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
    const { thoiGianChieu, phim, rap } = req.body;

    const phimTonTai = await phimRouter.findById(phim);
    if (!phimTonTai) {
      return res.json({ status: false, message: "Phim không tồn tại" });
    }

    const rapTonTai = await rapRouter.findById(rap);
    if (!rapTonTai) {
      return res.json({ status: false, message: "Rạp không tồn tại" });
    }

    const suatChieuMoi = new suatChieuRouter({ thoiGianChieu, phim, rap });
    await suatChieuMoi.save();

    res.json({
      status: true,
      message: "Tạo suất chiếu mới thành công",
      data: suatChieuMoi,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi tạo suất chiếu mới: " + error.message,
    });
  }
});

// Cập nhật thông tin suất chiếu
// http://localhost:3000/suatchieu/update
/**
 * @swagger
 * /suatchieu/update:
 *   post:
 *     summary: Cập nhật thông tin suất chiếu
 *     tags: [SuatChieu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               thoiGianChieu:
 *                 type: string
 *               phim:
 *                 type: string
 *               rap:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thông tin suất chiếu sau khi cập nhật
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
    const { id, thoiGianChieu, phim, rap } = req.body;

    const suatChieu = await suatChieuRouter.findById(id);
    if (!suatChieu) {
      return res.json({ status: false, message: "Suất chiếu không tồn tại" });
    }

    if (phim) {
      const phimTonTai = await phimRouter.findById(phim);
      if (!phimTonTai) {
        return res.json({ status: false, message: "Phim không tồn tại" });
      }
      suatChieu.phim = phim;
    }

    if (rap) {
      const rapTonTai = await rapRouter.findById(rap);
      if (!rapTonTai) {
        return res.json({ status: false, message: "Rạp không tồn tại" });
      }
      suatChieu.rap = rap;
    }

    suatChieu.thoiGianChieu = thoiGianChieu;

    await suatChieu.save();
    res.json({
      status: true,
      message: "Cập nhật suất chiếu thành công",
      data: suatChieu,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi cập nhật suất chiếu: " + error.message,
    });
  }
});

// Xóa một suất chiếu
// http://localhost:3000/suatchieu/delete
/**
 * @swagger
 * /suatchieu/delete:
 *   post:
 *     summary: Xóa một suất chiếu
 *     tags: [SuatChieu]
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
 *         description: Thông tin suất chiếu đã xóa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/delete", async (req, res, next) => {
  try {
    const { id } = req.body;
    const suatChieuXoa = await suatChieuRouter.findByIdAndDelete(id);
    if (!suatChieuXoa) {
      return res.json({ status: false, message: "Suất chiếu không tồn tại" });
    }
    res.json({
      status: true,
      message: "Xóa suất chiếu thành công",
      data: suatChieuXoa,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi xóa suất chiếu: " + error.message,
    });
  }
});

// Lấy thông tin một suất chiếu
// http://localhost:3000/suatchieu/get-by-id
/**
 * @swagger
 * /suatchieu/get-by-id:
 *   post:
 *     summary: Lấy thông tin một suất chiếu
 *     tags: [SuatChieu]
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
 *         description: Thông tin suất chiếu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 suatChieu:
 *                   type: object
 */
router.post("/get-by-id", async (req, res, next) => {
  try {
    const { id } = req.body;
    const suatChieu = await suatChieuRouter.findById(id)
      .populate("phim")
      .populate("rap");
    if (!suatChieu) {
      return res.json({ status: false, message: "Suất chiếu không tồn tại" });
    }
    res.json({ status: true, suatChieu });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi lấy thông tin suất chiếu: " + error.message,
    });
  }
});

module.exports = router;
