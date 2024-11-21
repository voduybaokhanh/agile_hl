var express = require("express");
var router = express.Router();
var adminRouter = require("../models/Admin");

//lất tất cả danh sách của admin
//http://localhost:3000/admin/list
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

//đăng ký
//http://localhost:3000/admin/register
router.post("/register", async function (req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({
        status: false,
        message: "Các trường name, email và password là bắt buộc",
      });
    }
    // Kiểm tra xem email đã tồn tại chưa
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

//đăng nhập nhưng email phải có đuôi @admin.com
//http://localhost:3000/admin/login
router.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        status: false,
        message: "Email và password là bắt buộc",
      });
    }
    // Kiểm tra đuôi email
    if (!email.endsWith("@admin.com")) {
      return res.json({
        status: false,
        message: "Email phải có đuôi @admin.com",
      });
    }
    // Tìm admin
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

//xóa
//http://localhost:3000/admin/delete
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

//sửa, chỉ sửa được name và password và coi email có tồn tai không
//http://localhost:3000/admin/update
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
