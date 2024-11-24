const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const gioHang = new Schema({
  id: { type: ObjectId },
  ngayTao: { type: Date, default: Date.now },
  TrangThai: {
    type: String,
    required: true,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  user: { type: ObjectId, ref: "user", required: true },
  ve: { type: ObjectId, ref: "ve", required: true },
  khuyenMai: { type: ObjectId, ref: "khuyenMai", required: true },
});

module.exports = mongoose.models.gioHang || mongoose.model("gioHang", gioHang);
