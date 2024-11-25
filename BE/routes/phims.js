/**
 * @swagger
 * tags:
 *   name: Phim
 *   description: API quản lý các phim
 */

var express = require("express");
var router = express.Router();
var phimRouter = require("../models/Phim");
var adminRouter = require("../models/Admin");

/**
 * @swagger
 * /phim/list:
 *   get:
 *     summary: Lấy danh sách tất cả các phim
 *     tags: [Phim]
 *     responses:
 *       200:
 *         description: Danh sách các phim
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/list", async (req, res) => {
  try {
    const phimList = await phimRouter.find().populate("admin").exec();
    res.json(phimList);
  } catch (err) {
    res.json({
      status: false,
      message: "Lỗi khi lấy danh sách phim: " + err.message,
    });
  }
});

/**
 * @swagger
 * /phim/add:
 *   post:
 *     summary: Thêm một phim mới
 *     tags: [Phim]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tenPhim:
 *                 type: string
 *               moTa:
 *                 type: string
 *               thoiLuong:
 *                 type: integer
 *               theLoai:
 *                 type: string
 *               ngayPhatHanh:
 *                 type: string
 *                 format: date
 *               trailer:
 *                 type: string
 *               admin:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thêm phim thành công
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
    const { tenPhim, moTa, thoiLuong, theLoai, ngayPhatHanh, trailer, admin } =
      req.body;
    // Kiểm tra admin có tồn tại không
    const existingAdmin = await adminRouter.findById(admin);
    if (!existingAdmin) {
      return res.json({ status: false, message: "Admin ID không hợp lệ" });
    }
    // Tạo phim mới
    const newPhim = new phimRouter({
      tenPhim,
      moTa,
      thoiLuong,
      theLoai,
      ngayPhatHanh,
      trailer,
      admin,
    });
    await newPhim.save();
    res.json({ status: true, message: "Thêm phim thành công", data: newPhim });
  } catch (err) {
    res.json({ status: false, message: "Lỗi thêm phim: " + err.message });
  }
});

/**
 * @swagger
 * /phim/update:
 *   put:
 *     summary: Cập nhật thông tin một phim
 *     tags: [Phim]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               tenPhim:
 *                 type: string
 *               moTa:
 *                 type: string
 *               thoiLuong:
 *                 type: integer
 *               theLoai:
 *                 type: string
 *               ngayPhatHanh:
 *                 type: string
 *                 format: date
 *               trailer:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật phim thành công
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
    const { id, tenPhim, moTa, thoiLuong, theLoai, ngayPhatHanh, trailer } =
      req.body;
    if (!id) {
      return res.json({ status: false, message: "ID phim là bắt buộc" });
    }
    // Tìm và cập nhật phim
    const updatedPhim = await phimRouter.findByIdAndUpdate(
      id,
      { tenPhim, moTa, thoiLuong, theLoai, ngayPhatHanh, trailer },
      { new: true, runValidators: true }
    );
    if (!updatedPhim) {
      return res.json({ status: false, message: "Không tìm thấy phim" });
    }
    res.json({
      status: true,
      message: "Cập nhật phim thành công",
      data: updatedPhim,
    });
  } catch (err) {
    res.json({ status: false, message: "Lỗi cập nhật phim: " + err.message });
  }
});

/**
 * @swagger
 * /phim/delete:
 *   delete:
 *     summary: Xóa một phim
 *     tags: [Phim]
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
 *         description: Xóa phim thành công
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
      return res.json({ status: false, message: "ID phim là bắt buộc" });
    }
    // Tìm và xóa phim
    const deletedPhim = await phimRouter.findByIdAndDelete(id);
    if (!deletedPhim) {
      return res.json({ status: false, message: "Không tìm thấy phim" });
    }
    res.json({ status: true, message: "Xóa phim thành công" });
  } catch (err) {
    res.json({ status: false, message: "Lỗi xóa phim: " + err.message });
  }
});

/**
 * @swagger
 * /phim/detail:
 *   get:
 *     summary: Lấy thông tin chi tiết một phim
 *     tags: [Phim]
 *     parameters:
 *       - in: body
 *         name: id
 *         description: ID của phim cần lấy
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin phim chi tiết
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
router.get("/detail", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.json({ status: false, message: "ID phim là bắt buộc" });
    }
    // Tìm phim theo ID
    const phim = await phimRouter.findById(id).populate("admin", "name email");
    if (!phim) {
      return res.json({ status: false, message: "Không tìm thấy phim" });
    }
    res.json({ status: true, data: phim });
  } catch (err) {
    res.json({
      status: false,
      message: "Lỗi lấy chi tiết phim: " + err.message,
    });
  }
});

module.exports = router;
