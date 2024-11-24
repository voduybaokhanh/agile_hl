var express = require("express");
var router = express.Router();
var rapRouter = require("../models/Rap");

// Lấy danh sách tất cả các rạp
// http://localhost:3000/rap/get-all
router.post("/get-all", async (req, res, next) => {
  try {
    const danhSachRap = await rapRouter.find();
    res.json({ status: true, danhSachRap });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi lấy danh sách rạp" + error.message,
    });
  }
});

// Tạo mới một rạp
// http://localhost:3000/rap/add
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

// Cập nhật thông tin rạp
// http://localhost:3000/rap/update
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

// Xóa một rạp
// http://localhost:3000/rap/delete
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

// Lấy thông tin một rạp
// http://localhost:3000/rap/get-by-id
router.get("/get-by-id", async (req, res, next) => {
  try {
    const { id } = req.body;
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
