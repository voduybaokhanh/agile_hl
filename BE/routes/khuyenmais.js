var express = require("express");
var router = express.Router();
var khuyenmaiRouter = require("../models/Khuyenmai");
var adminRouter = require("../models/Admin");

// Lấy danh sách tất cả khuyến mãi
// GET http://localhost:3000/khuyenmai/list
router.get("/list", async (req, res) => {
  try {
    const promotions = await khuyenmaiRouter
      .find()
      .populate("admin", "name email");
    res.json(promotions);
  } catch (err) {
    res.json({ status: false, message: "Lỗi server: " + err.message });
  }
});

// Lấy chi tiết khuyến mãi theo ID (truyền qua body)
// POST http://localhost:3000/khuyenmai/detail
router.post("/detail", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.json({ status: false, message: "ID không được để trống" });
    }
    const promotion = await khuyenmaiRouter
      .findById(id)
      .populate("admin", "ten email");
    if (!promotion) {
      return res.json({ status: false, message: "Khuyến mãi không tồn tại" });
    }
    res.json(promotion);
  } catch (err) {
    res.json({ status: false, message: "Lỗi server: " + err.message });
  }
});

// Tạo khuyến mãi mới
// POST http://localhost:3000/khuyenmai/add
router.post("/add", async (req, res) => {
  try {
    const {
      tieuDe,
      noiDung,
      mucGiamGia,
      loaiKhuyenMai,
      maKhuyenMai,
      ngayBatDau,
      ngayKetThuc,
      admin,
    } = req.body;
    if (
      !tieuDe ||
      !noiDung ||
      !mucGiamGia ||
      !loaiKhuyenMai ||
      !maKhuyenMai ||
      !ngayBatDau ||
      !ngayKetThuc ||
      !admin
    ) {
      return res.json({
        status: false,
        message: "Thông tin không được để trống",
      });
    }
    const adminExists = await adminRouter.findById(admin);
    if (!adminExists) {
      return res.json({ status: false, message: "Người dùng không tồn tại" });
    }
    const newPromotion = new khuyenmaiRouter({
      tieuDe,
      noiDung,
      mucGiamGia,
      loaiKhuyenMai,
      maKhuyenMai,
      ngayBatDau,
      ngayKetThuc,
      admin,
    });
    await newPromotion.save();
    res.json({
      status: true,
      message: "Tạo khuyến mãi thành công",
      data: newPromotion,
    });
  } catch (err) {
    res.json({
      status: false,
      message: "Lỗi khi tạo khuyến mãi: " + err.message,
    });
  }
});

// Cập nhật thông tin khuyến mãi
// PUT http://localhost:3000/khuyenmai/update
router.put("/update", async (req, res) => {
  try {
    const {
      id,
      tieuDe,
      noiDung,
      mucGiamGia,
      loaiKhuyenMai,
      maKhuyenMai,
      ngayBatDau,
      ngayKetThuc,
      admin,
    } = req.body;

    if (!id) {
      return res.json({ status: false, message: "ID không được để trống" });
    }

    const promotion = await khuyenmaiRouter.findById(id);
    if (!promotion) {
      return res.json({ status: false, message: "Khuyến mãi không tồn tại" });
    }

    if (admin) {
      const adminExists = await adminRouter.findById(admin);
      if (!adminExists) {
        return res.json({ status: false, message: "Người dùng không tồn tại" });
      }
    }

    const updatedPromotion = await khuyenmaiRouter.findByIdAndUpdate(
      id,
      {
        tieuDe,
        noiDung,
        mucGiamGia,
        loaiKhuyenMai,
        maKhuyenMai,
        ngayBatDau,
        ngayKetThuc,
        admin,
      },
      { new: true, runValidators: true }
    );

    res.json({
      status: true,
      message: "Cập nhật thành công",
      data: updatedPromotion,
    });
  } catch (err) {
    res.json({ status: false, message: "Lỗi khi cập nhật: " + err.message });
  }
});

// Xóa khuyến mãi
// DELETE http://localhost:3000/khuyenmai/delete
router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.json({ status: false, message: "ID không được để trống" });
    }

    const deletedPromotion = await khuyenmaiRouter.findByIdAndDelete(id);
    if (!deletedPromotion) {
      return res.json({ status: false, message: "Khuyến mãi không tồn tại" });
    }

    res.json({ status: true, message: "Xóa khuyến mãi thành công" });
  } catch (err) {
    res.json({ status: false, message: "Lỗi server: " + err.message });
  }
});

module.exports = router;
