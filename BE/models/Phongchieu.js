const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const phongchieu = new Schema({
  id: { type: ObjectId },
  TenPhong: { type: String, required: true, trim: true }, // Trim để loại bỏ khoảng trắng
  Soghe: { type: Number, required: true, min: 0 }, // min: 0 để không có số âm
  TrangThai: {
    type: String,
    enum: ["Hoạt động", "Bảo trì"],
    default: "Hoạt động",
  }, // Trạng thái phòng
  rap: { type: ObjectId, ref: "rap", required: true },
});

module.exports =
  mongoose.models.user || mongoose.model("phongchieu", phongchieu);
