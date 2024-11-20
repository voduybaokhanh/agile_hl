var express = require('express');
var router = express.Router();
var adminRouter = require('../models/Admin');

//lất tất cả danh sách của admin
//http://localhost:3000/admin
router.get('/', async function (req, res, next) {
  const admin = await adminRouter.find();
  res.json(admin);
});

//đăng ký
//http://localhost:3000/admin/register
router.post('/register', async function (req, res, next) {
  try {
    const { name, email, password } = req.body;
    const addAdmin = { name, email, password };
    await adminRouter.create(addAdmin);
    res.json({ status: true, message: 'Thêm thành công' });
  } catch (err) {
    res.json({ status: false, message: 'Thêm thất bại mail không được trùng ' + err.message });
  }
});

//đăng nhập nhưng email phải có đuôi @admin.com
//http://localhost:3000/admin/login
router.post('/login', async function (req, res, next) {
  try {
    const { email, password } = req.body;

    // Check if the email has the @admin.com domain
    if (!email.endsWith('@admin.com')) {
      return res.json({ status: false, message: 'Email phải có đuôi @admin.com' });
    }

    const admin = await adminRouter.findOne({ email: email, password: password });

    if (admin) {
      res.json({ status: true, message: 'Đăng nhập thành công' });
    } else {
      res.json({ status: false, message: 'Thông tin đăng nhập không chính xác' });
    }
  } catch (err) {
    res.json({ status: false, message: 'Đăng nhập thất bại: ' + err.message });
  }
});


module.exports = router;
