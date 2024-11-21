const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const phim = new Schema(
  {
    id: { type: ObjectId },
    TenPhim: { type: String, required: true, trim: true },
    MoTa: { type: String, trim: true },
    ThoiLuong: { type: Number, min: 1 }, // Không thể có thời gian âm
    TheLoai: { type: String, trim: true },
    NgayPhatHanh: { type: Date },
    Trailer: { type: String, match: /^https?:\/\/.+/ }, // Kiểm tra URL hợp lệ
    admin: { type: ObjectId, ref: "admin", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.phim || mongoose.model("phim", phim);
