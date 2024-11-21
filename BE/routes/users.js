var express = require("express");
var router = express.Router();
var usersRouter = require("../models/User");

//lấy tất cả danh sách user
//http://localhost:3000/user/list
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
router.post("/add", async (req, res) => {
  try {
    const { name, email, password} = req.body;
    if (!name || !email || !password) {
      return res.json({
        status: false,
        message: "Thông tin không được để trống",
      });
    }
    const newUser = new usersRouter({
      name,
      email,
      password
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
router.put("/update", async (req, res) => {
  try {
    const { id, name, email, password } = req.body;
    if (!id) {
      return res.json({ status: false, message: "ID không được để trống" });
    }
    const updatedUser = await usersRouter.findByIdAndUpdate(
      id,
      { name, email, password },
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

// Xóa người dùng (ID truyền qua body)
// DELETE http://localhost:3000/user/delete
router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.json({ status: false, message: "ID không được để trống" });
    }
    const deletedUser = await usersRouter.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.json({ status: false, message: "Người dùng không tồn tại" });
    }
    res.json({ status: true, message: "Xóa người dùng thành công" });
  } catch (err) {
    res.json({ status: false, message: "Lỗi server: " + err.message });
  }
});

module.exports = router;
