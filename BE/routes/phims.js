var express = require("express");
var router = express.Router();
var phimRouter = require("../models/Phim");
var adminRouter = require("../models/Admin");

// LẤY DANH SÁCH TẤT CẢ PHIM kèm theo thông tin khóa ngoại admin
// POST http://localhost:3000/phim/list
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

// Thêm một phim mới
// http://localhost:3000/phim/add
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

// Cập nhật thông tin một phim
// http://localhost:3000/phim/update
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

// Xóa một phim
// http://localhost:3000/phim/delete
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

// Lấy thông tin chi tiết một phim
// http://localhost:3000/phim/detail
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
