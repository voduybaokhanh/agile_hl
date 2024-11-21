const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const phim = new Schema(
  {
    id: { type: ObjectId },
    tenPhim: { type: String, required: true, trim: true },
    moTa: { type: String, trim: true },
    thoiLuong: { type: Number, min: 1 }, // Không thể có thời gian âm
    theLoai: { type: String, trim: true },
    ngayPhatHanh: { type: Date },
    trailer: { type: String, match: /^https?:\/\/.+/ }, // Kiểm tra URL hợp lệ
    admin: { type: ObjectId, ref: "admin", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.phim || mongoose.model("phim", phim);
