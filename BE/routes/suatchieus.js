var express = require('express');
var router = express.Router();
var phimRouter = require('../models/Phim');
var suatchieuRouter = require('../models/Suatchieu');

// Thêm suất chiếu , không thể thêm suất chiếu cho phim cùng rap và phòng chiếu, khung giờ trùng nhau
// POST http://localhost:3000/Suatchieu/add
router.post('/add', async (req, res) => {
  try {
    const { phim, rap, phongChieu, thoiGianChieu } = req.body;
    // Kiểm tra phim có tồn tại không
    const existingPhim = await phimRouter.findById(phim);
    if (!existingPhim) {
      return res.json({ message: 'Phim không tồn tại' });
    }
    // Kiểm tra suất chiếu trùng lặp
    const suatchieuExists = await suatchieuRouter.findOne({
      rap,
      phongChieu,
      thoiGianChieu
    });
    if (suatchieuExists) {
      return res.json({ message: 'Suất chiếu đã tồn tại' });
    }
    // Tạo mới suất chiếu
    const newSuatChieu = new suatchieuRouter({
      phim,
      rap,
      phongChieu,
      thoiGianChieu
    });
    await newSuatChieu.save();
    res.json({ message: 'Thêm suất chiếu thành công', suatchieu: newSuatChieu });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

// Lấy danh sách suất chiếu
// GET http://localhost:3000/Suatchieu/list
router.get('/list', async (req, res) => {
  try {
    const { rap } = req.body; // Lọc theo `rap` nếu cần
    const query = rap ? { rap } : {}; // Nếu `rap` tồn tại, thêm điều kiện lọc
    const suatChieuList = await suatchieuRouter.find(query).populate('phim'); // Gắn thông tin phim
    res.json({ message: 'Lấy danh sách suất chiếu thành công', suatChieuList });
  } catch (err) {
    res.json({ message: 'Lỗi server', error: err.message });
  }
});

// Lấy chi tiết suất chiếu theo ID
// POST http://localhost:3000/Suatchieu/detail
router.post('/detail', async (req, res) => {
  try {
    const { id } = req.body; // Truyền ID qua body
    const suatChieu = await suatchieuRouter.findById(id).populate('phim');
    if (!suatChieu) {
      return res.json({ message: 'Suất chiếu không tồn tại' });
    }
    res.json({ message: 'Lấy chi tiết suất chiếu thành công', suatChieu });
  } catch (err) {
    res.json({ message: 'Lỗi server', error: err.message });
  }
});

// Cập nhật suất chiếu
// POST http://localhost:3000/Suatchieu/update
router.post('/update', async (req, res) => {
  try {
    const { id, rap, phongChieu, thoiGianChieu, phim } = req.body;
    // Kiểm tra nếu phim mới có hợp lệ
    if (phim) {
      const phimExists = await phimRouter.findById(phim);
      if (!phimExists) {
        return res.json({ message: 'Phim không tồn tại' });
      }
    }
    const suatChieu = await suatchieuRouter.findByIdAndUpdate(
      id,
      { rap, phongChieu, thoiGianChieu, phim },
      { new: true } // Trả về tài liệu đã cập nhật
    );
    if (!suatChieu) {
      return res.json({ message: 'Suất chiếu không tồn tại' });
    }
    res.json({ message: 'Cập nhật suất chiếu thành công', suatChieu });
  } catch (err) {
    res.json({ message: 'Lỗi server', error: err.message });
  }
});

// Xóa suất chiếu
// POST http://localhost:3000/Suatchieu/delete
router.post('/delete', async (req, res) => {
  try {
    const { id } = req.body; // Truyền ID qua body
    const suatChieu = await suatchieuRouter.findByIdAndDelete(id);
    if (!suatChieu) {
      return res.json({ message: 'Suất chiếu không tồn tại' });
    }
    res.json({ message: 'Xóa suất chiếu thành công', suatChieu });
  } catch (err) {
    res.json({ message: 'Lỗi server', error: err.message });
  }
});

module.exports = router;
