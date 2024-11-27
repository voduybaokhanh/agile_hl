/**
 * @swagger
 * tags:
 *   name: Rap
 *   description: API quản lý các rạp chiếu phim
 */

var express = require("express");
var router = express.Router();
var rapRouter = require("../models/Rap");

/**
 * @swagger
 * /rap/get-all:
 *   post:
 *     summary: Lấy danh sách tất cả các rạp
 *     tags: [Rap]
 *     responses:
 *       200:
 *         description: Danh sách các rạp chiếu phim
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 danhSachRap:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.post("/get-all", async (req, res, next) => {
  try {
    const danhSachRap = await rapRouter.find();
    res.json({ status: true, danhSachRap });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi lấy danh sách rạp: " + error.message,
    });
  }
});

/**
 * @swagger
 * /rap/add:
 *   post:
 *     summary: Tạo mới một rạp chiếu phim
 *     tags: [Rap]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TenRap:
 *                 type: string
 *               DiaChi:
 *                 type: string
 *               SoPhong:
 *                 type: integer
 *               TrangThai:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thông tin rạp chiếu phim mới tạo
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
    const { TenRap, DiaChi, SoPhong, TrangThai } = req.body;
    const rapMoi = new rapRouter({ TenRap, DiaChi, SoPhong, TrangThai });
    await rapMoi.save();
    res.json({ status: true, message: "Tạo rạp mới thành công", data: rapMoi });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi tạo rạp mới: " + error.message,
    });
  }
});

/**
 * @swagger
 * /rap/update:
 *   post:
 *     summary: Cập nhật thông tin của một rạp
 *     tags: [Rap]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               TenRap:
 *                 type: string
 *               DiaChi:
 *                 type: string
 *               SoPhong:
 *                 type: integer
 *               TrangThai:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thông tin rạp sau khi cập nhật
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
    const { id, TenRap, DiaChi, SoPhong, TrangThai } = req.body;
    const rapUpdate = await rapRouter.findById(id);
    if (!rapUpdate) {
      return res.json({ status: false, message: "Rạp không tồn tại" });
    }
    rapUpdate.TenRap = TenRap;
    rapUpdate.DiaChi = DiaChi;
    rapUpdate.SoPhong = SoPhong;
    rapUpdate.TrangThai = TrangThai;
    await rapUpdate.save();
    res.json({
      status: true,
      message: "Cập nhật rạp thành công",
      data: rapUpdate,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi cập nhật rạp: " + error.message,
    });
  }
});

/**
 * @swagger
 * /rap/delete:
 *   post:
 *     summary: Xóa một rạp chiếu phim
 *     tags: [Rap]
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
 *         description: Thông tin rạp đã xóa
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
    const rapXoa = await rapRouter.findByIdAndDelete(id);
    if (!rapXoa) {
      return res.json({ status: false, message: "Rạp không tồn tại" });
    }
    res.json({ status: true, message: "Xóa rạp thành công", data: rapXoa });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi xóa rạp: " + error.message,
    });
  }
});

/**
 * @swagger
 * /rap/get-by-id:
 *   get:
 *     summary: Lấy thông tin một rạp theo ID
 *     tags: [Rap]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin của rạp
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 rap:
 *                   type: object
 */
router.get("/get-by-id", async (req, res, next) => {
  try {
    const { id } = req.query;
    const rap = await rapRouter.findById(id);
    if (!rap) {
      return res.json({ status: false, message: "Rạp không tồn tại" });
    }
    res.json({ status: true, rap });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi lấy thông tin rạp: " + error.message,
    });
  }
});

module.exports = router;
