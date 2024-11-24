var express = require("express");
var router = express.Router();
var thanhtoanRouter = require("../models/Thanhtoan");
var veRouter = require("../models/Ve");

// Lấy danh sách tất cả các thanh toán
// http://localhost:3000/thanhtoan/get-all
router.get("/get-all", async (req, res, next) => {
  try {
    const danhSachThanhToan = await thanhtoanRouter.find().populate("ve");
    res.json({ status: true, danhSachThanhToan });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi lấy danh sách thanh toán: " + error.message,
    });
  }
});

// Tạo mới một thanh toán
// http://localhost:3000/thanhtoan/add
router.post("/add", async (req, res, next) => {
  try {
    const { PhuongThucThanhToan, NgayThanhToan, TrangThai, ve } = req.body;

    // Kiểm tra vé
    const veTonTai = await veRouter.findById(ve);
    if (!veTonTai) {
      return res.json({ status: false, message: "Vé không tồn tại" });
    }

    const thanhToanMoi = new thanhtoanRouter({
      PhuongThucThanhToan,
      NgayThanhToan,
      TrangThai,
      ve,
    });
    await thanhToanMoi.save();

    res.json({
      status: true,
      message: "Tạo thanh toán mới thành công",
      data: thanhToanMoi,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi tạo thanh toán mới: " + error.message,
    });
  }
});

// Cập nhật thông tin thanh toán
// http://localhost:3000/thanhtoan/update
router.post("/update", async (req, res, next) => {
  try {
    const { id, PhuongThucThanhToan, NgayThanhToan, TrangThai, ve } = req.body;

    // Kiểm tra thanh toán
    const thanhToan = await thanhtoanRouter.findById(id);
    if (!thanhToan) {
      return res.json({ status: false, message: "Thanh toán không tồn tại" });
    }

    // Kiểm tra vé nếu được cập nhật
    if (ve) {
      const veTonTai = await veRouter.findById(ve);
      if (!veTonTai) {
        return res.json({ status: false, message: "Vé không tồn tại" });
      }
      thanhToan.ve = ve;
    }

    thanhToan.PhuongThucThanhToan = PhuongThucThanhToan;
    thanhToan.NgayThanhToan = NgayThanhToan;
    thanhToan.TrangThai = TrangThai;

    await thanhToan.save();

    res.json({
      status: true,
      message: "Cập nhật thanh toán thành công",
      data: thanhToan,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi cập nhật thanh toán: " + error.message,
    });
  }
});

// Xóa một thanh toán
// http://localhost:3000/thanhtoan/delete
router.post("/delete", async (req, res, next) => {
  try {
    const { id } = req.body;

    const thanhToanXoa = await thanhtoanRouter.findByIdAndDelete(id);
    if (!thanhToanXoa) {
      return res.json({ status: false, message: "Thanh toán không tồn tại" });
    }

    res.json({
      status: true,
      message: "Xóa thanh toán thành công",
      data: thanhToanXoa,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi xóa thanh toán: " + error.message,
    });
  }
});

// Lấy thông tin một thanh toán
// http://localhost:3000/thanhtoan/get-by-id
router.post("/get-by-id", async (req, res, next) => {
  try {
    const { id } = req.body;

    const thanhToan = await thanhtoanRouter.findById(id).populate("ve");
    if (!thanhToan) {
      return res.json({ status: false, message: "Thanh toán không tồn tại" });
    }

    res.json({ status: true, thanhToan });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi lấy thông tin thanh toán: " + error.message,
    });
  }
});

module.exports = router;
