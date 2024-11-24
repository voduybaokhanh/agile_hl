var express = require("express");
var router = express.Router();
var suatChieuRouter = require("../models/Suatchieu");
var rapRouter = require("../models/Rap");
var phimRouter = require("../models/Phim");

// Lấy danh sách tất cả các suất chiếu
// http://localhost:3000/suatchieu/get-all
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
router.post("/add", async (req, res, next) => {
  try {
    const { thoiGianChieu, phim, rap } = req.body;

    // Kiểm tra phim và rạp có tồn tại không
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
router.post("/update", async (req, res, next) => {
  try {
    const { id, thoiGianChieu, phim, rap } = req.body;

    // Kiểm tra suất chiếu
    const suatChieu = await suatChieuRouter.findById(id);
    if (!suatChieu) {
      return res.json({ status: false, message: "Suất chiếu không tồn tại" });
    }

    // Kiểm tra và cập nhật phim, rạp
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
