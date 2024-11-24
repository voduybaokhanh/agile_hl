var express = require('express');
var router = express.Router();
var rapRouter = require("../models/Rap");
var phongchieuRouter = require("../models/PhongChieu");


// Lấy danh sách tất cả các phòng chiếu
// http://localhost:3000/phongchieu/get-all
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

// Tạo mới một phòng chiếu
// http://localhost:3000/phongchieu/add
router.post("/add", async (req, res, next) => {
  try {
    const { TenPhongChieu, SoGhe, rap, TrangThai } = req.body;

    // Kiểm tra xem rạp có tồn tại không
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

// Cập nhật thông tin phòng chiếu
// http://localhost:3000/phongchieu/update
router.post("/update", async (req, res, next) => {
  try {
    const { id, TenPhongChieu, SoGhe, rap, TrangThai } = req.body;

    // Kiểm tra phòng chiếu
    const phongChieu = await phongchieuRouter.findById(id);
    if (!phongChieu) {
      return res.json({ status: false, message: "Phòng chiếu không tồn tại" });
    }

    // Kiểm tra rạp
    if (rap) {
      const rapTonTai = await rapRouter.findById(rap);
      if (!rapTonTai) {
        return res.json({ status: false, message: "Rạp không tồn tại" });
      }
      phongChieu.rap = rap;
    }

    // Cập nhật thông tin phòng chiếu
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

// Xóa một phòng chiếu
// http://localhost:3000/phongchieu/delete
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

// Lấy thông tin một phòng chiếu
// http://localhost:3000/phongchieu/get-by-id
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
