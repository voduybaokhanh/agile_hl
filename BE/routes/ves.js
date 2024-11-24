var express = require("express");
var router = express.Router();
var veRouter = require("../models/Ve");
var suatchieuRouter = require("../models/Suatchieu");
var userRouter = require("../models/User");

// Lấy danh sách tất cả vé
// http://localhost:3000/ve/get-all
router.get("/get-all", async (req, res, next) => {
  try {
    const danhSachVe = await veRouter.find().populate("suatchieu").populate("user");
    res.json({ status: true, danhSachVe });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi lấy danh sách vé: " + error.message,
    });
  }
});

// Tạo mới một vé
// http://localhost:3000/ve/add
router.post("/add", async (req, res, next) => {
  try {
    const { gheNgoi, giaVe, suatchieu, user } = req.body;

    // Kiểm tra suất chiếu
    const suatchieuTonTai = await suatchieuRouter.findById(suatchieu);
    if (!suatchieuTonTai) {
      return res.json({ status: false, message: "Suất chiếu không tồn tại" });
    }

    // Kiểm tra user
    const userTonTai = await userRouter.findById(user);
    if (!userTonTai) {
      return res.json({ status: false, message: "Người dùng không tồn tại" });
    }

    const veMoi = new veRouter({ gheNgoi, giaVe, suatchieu, user });
    await veMoi.save();

    res.json({
      status: true,
      message: "Tạo vé mới thành công",
      data: veMoi,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi tạo vé mới: " + error.message,
    });
  }
});

// Cập nhật thông tin vé
// http://localhost:3000/ve/update
router.post("/update", async (req, res, next) => {
  try {
    const { id, gheNgoi, giaVe, suatchieu, user } = req.body;

    // Kiểm tra vé
    const ve = await veRouter.findById(id);
    if (!ve) {
      return res.json({ status: false, message: "Vé không tồn tại" });
    }

    // Kiểm tra suất chiếu nếu được cập nhật
    if (suatchieu) {
      const suatchieuTonTai = await suatchieuRouter.findById(suatchieu);
      if (!suatchieuTonTai) {
        return res.json({ status: false, message: "Suất chiếu không tồn tại" });
      }
      ve.suatchieu = suatchieu;
    }

    // Kiểm tra user nếu được cập nhật
    if (user) {
      const userTonTai = await userRouter.findById(user);
      if (!userTonTai) {
        return res.json({ status: false, message: "Người dùng không tồn tại" });
      }
      ve.user = user;
    }

    ve.gheNgoi = gheNgoi;
    ve.giaVe = giaVe;

    await ve.save();

    res.json({
      status: true,
      message: "Cập nhật vé thành công",
      data: ve,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi cập nhật vé: " + error.message,
    });
  }
});

// Xóa một vé
// http://localhost:3000/ve/delete
router.post("/delete", async (req, res, next) => {
  try {
    const { id } = req.body;

    const veXoa = await veRouter.findByIdAndDelete(id);
    if (!veXoa) {
      return res.json({ status: false, message: "Vé không tồn tại" });
    }

    res.json({
      status: true,
      message: "Xóa vé thành công",
      data: veXoa,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi xóa vé: " + error.message,
    });
  }
});

// Lấy thông tin một vé
// http://localhost:3000/ve/get-by-id
router.post("/get-by-id", async (req, res, next) => {
  try {
    const { id } = req.body;

    const ve = await veRouter.findById(id).populate("suatchieu").populate("user");
    if (!ve) {
      return res.json({ status: false, message: "Vé không tồn tại" });
    }

    res.json({ status: true, ve });
  } catch (error) {
    res.json({
      status: false,
      message: "Lỗi khi lấy thông tin vé: " + error.message,
    });
  }
});

module.exports = router;
