const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const admin = new Schema(
  {
    id: { type: ObjectId },
    name: { type: String, required: [true, "Tên không được để trống"] },
    email: {
      type: String,
      required: [true, "Email không được để trống"],
      unique: true, // Đảm bảo email duy nhất match: [/^\S+@\S+\.\S+$/, 'Email không hợp lệ'],
    },
    password: {
      type: String,
      required: [true, "Mật khẩu không được để trống"],
    },
  },
  { timestamps: true } // Thêm createdAt và updatedAt tự động
);

module.exports = mongoose.models.admin || mongoose.model("admin", admin);
