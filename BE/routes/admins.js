/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API quản lý admin
 */

var express = require("express");
var router = express.Router();
var adminRouter = require("../models/Admin");

/**
 * @swagger
 * /admin/list:
 *   get:
 *     summary: Lấy danh sách tất cả admin
 *     tags: [Admin]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Trang hiện tại
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Số lượng admin mỗi trang
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Danh sách admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 total:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 */
router.get("/list", async function (req, res, next) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const admins = await adminRouter
      .find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await adminRouter.countDocuments();
    res.json({
      status: true,
      data: admins,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.json({ status: false, message: "Lỗi server: " + err.message });
  }
});

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Đăng ký admin mới
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 *       400:
 *         description: Thêm thất bại
 */
router.post("/register", async function (req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({
        status: false,
        message: "Các trường name, email và password là bắt buộc",
      });
    }
    const isExist = await adminRouter.findOne({ email });
    if (isExist) {
      return res.json({ status: false, message: "Email đã tồn tại" });
    }
    const addAdmin = { name, email, password };
    await adminRouter.create(addAdmin);
    res.json({ status: true, message: "Thêm thành công" });
  } catch (err) {
    res.json({ status: false, message: "Thêm thất bại: " + err.message });
  }
});

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Đăng nhập admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       400:
 *         description: Thông tin đăng nhập không chính xác
 */
router.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        status: false,
        message: "Email và password là bắt buộc",
      });
    }
    if (!email.endsWith("@admin.com")) {
      return res.json({
        status: false,
        message: "Email phải có đuôi @admin.com",
      });
    }
    const admin = await adminRouter.findOne({ email, password });
    if (!admin) {
      return res.json({
        status: false,
        message: "Thông tin đăng nhập không chính xác",
      });
    }
    res.json({ status: true, message: "Đăng nhập thành công" });
  } catch (err) {
    res.json({ status: false, message: "Đăng nhập thất bại: " + err.message });
  }
});

/**
 * @swagger
 * /admin/delete:
 *   delete:
 *     summary: Xóa admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       400:
 *         description: Xóa thất bại
 */
router.delete("/delete", async function (req, res, next) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({ status: false, message: "Email là bắt buộc" });
    }
    const admin = await adminRouter.findOne({ email });
    if (!admin) {
      return res.json({ status: false, message: "Admin không tồn tại" });
    }
    await adminRouter.deleteOne({ email });
    res.json({ status: true, message: "Xóa thành công" });
  } catch (err) {
    res.json({ status: false, message: "Xóa thất bại: " + err.message });
  }
});

/**
 * @swagger
 * /admin/update:
 *   put:
 *     summary: Cập nhật thông tin admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Cập nhật thất bại
 */
router.put("/update", async function (req, res, next) {
  try {
    const { email, name, password } = req.body;
    if (!email) {
      return res.json({ status: false, message: "Email là bắt buộc" });
    }
    const admin = await adminRouter.findOne({ email });
    if (!admin) {
      return res.json({ status: false, message: "Admin không tồn tại" });
    }
    const updateData = {};
    if (name) updateData.name = name;
    if (password) updateData.password = password;
    await adminRouter.updateOne({ email }, updateData);
    res.json({ status: true, message: "Cập nhật thành công" });
  } catch (err) {
    res.json({ status: false, message: "Cập nhật thất bại: " + err.message });
  }
});

module.exports = router;
