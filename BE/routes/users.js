/**
 * @swagger
 * tags:
 *   name: User
 *   description: API quản lý người dùng
 */

var express = require("express");
var router = express.Router();
var usersRouter = require("../models/User");

// Lấy tất cả danh sách user
// http://localhost:3000/user/list
/**
 * @swagger
 * /user/list:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/list", async (req, res) => {
  try {
    const users = await usersRouter.find();
    res.json(users);
  } catch (err) {
    res.json({ status: false, message: "Lỗi server: " + err.message });
  }
});

// Lấy thông tin người dùng theo ID (ID truyền qua body)
// POST http://localhost:3000/user/detail
/**
 * @swagger
 * /user/detail:
 *   post:
 *     summary: Lấy thông tin người dùng theo ID
 *     tags: [User]
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
 *         description: Thông tin chi tiết người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/detail", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.json({ status: false, message: "ID không được để trống" });
    }
    const user = await usersRouter.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "Người dùng không tồn tại" });
    }
    res.json(user);
  } catch (err) {
    res.json({ status: false, message: "Lỗi server: " + err.message });
  }
});

// Tạo người dùng mới
// POST http://localhost:3000/user/add
/**
 * @swagger
 * /user/add:
 *   post:
 *     summary: Tạo người dùng mới
 *     tags: [User]
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
 *               diemtichluy:
 *                 type: number
 *     responses:
 *       200:
 *         description: Người dùng mới được tạo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/add", async (req, res) => {
  try {
    const { name, email, password, diemtichluy } = req.body;
    if (!name || !email || !password) {
      return res.json({
        status: false,
        message: "Thông tin không được để trống",
      });
    }
    const newUser = new usersRouter({
      name,
      email,
      password,
      diemtichluy: diemtichluy || 0,
    });
    await newUser.save();
    res.json({
      status: true,
      message: "Tạo người dùng thành công",
      data: newUser,
    });
  } catch (err) {
    res.json({
      status: false,
      message: "Lỗi khi tạo người dùng: " + err.message,
    });
  }
});

// Cập nhật thông tin người dùng (ID truyền qua body)
// PUT http://localhost:3000/user/update
/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Cập nhật thông tin người dùng
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               diemtichluy:
 *                 type: number
 *     responses:
 *       200:
 *         description: Người dùng được cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put("/update", async (req, res) => {
  try {
    const { id, name, email, password, diemtichluy } = req.body;
    if (!id) {
      return res.json({ status: false, message: "ID không được để trống" });
    }
    const updatedUser = await usersRouter.findByIdAndUpdate(
      id,
      { name, email, password, diemtichluy },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.json({ status: false, message: "Người dùng không tồn tại" });
    }
    res.json({
      status: true,
      message: "Cập nhật thành công",
      data: updatedUser,
    });
  } catch (err) {
    res.json({ status: false, message: "Lỗi khi cập nhật: " + err.message });
  }
});

// Đăng nhập người dùng
// POST http://localhost:3000/user/login
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Đăng nhập thành công"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60d50f6f53f4c8b80c8b4567"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *       400:
 *         description: Lỗi đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Email hoặc mật khẩu không chính xác"
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        status: false,
        message: "Email và mật khẩu không được để trống",
      });
    }

    // Tìm người dùng theo email
    const user = await usersRouter.findOne({ email });
    if (!user) {
      return res.json({
        status: false,
        message: "Email hoặc mật khẩu không chính xác",
      });
    }

    // Kiểm tra mật khẩu (so sánh mật khẩu hash, tùy thuộc vào cách mã hóa mật khẩu bạn sử dụng)
    // Giả sử mật khẩu được mã hóa bằng bcrypt
    const bcrypt = require("bcrypt");
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({
        status: false,
        message: "Email hoặc mật khẩu không chính xác",
      });
    }

    // Đăng nhập thành công
    res.json({
      status: true,
      message: "Đăng nhập thành công",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.json({
      status: false,
      message: "Lỗi khi đăng nhập: " + err.message,
    });
  }
});

module.exports = router;
