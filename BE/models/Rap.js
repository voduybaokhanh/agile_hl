const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const rap = new Schema({
  id: { type: ObjectId },
  TenRap: { type: String, required: true, trim: true }, // Trim để loại bỏ khoảng trắng
  DiaChi: { type: String, required: true, trim: true },
  SoPhong: { type: Number, required: true, min: 0 }, // min: 0 để không có số âm
  TrangThai: {
    type: String,
    enum: ["Hoạt động", "Tạm ngưng"],
    default: "Hoạt động",
  }, // Trạng thái hoạt động
});

module.exports = mongoose.models.rap || mongoose.model("rap", rap);
