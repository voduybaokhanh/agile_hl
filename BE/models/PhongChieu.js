const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const phongchieu = new Schema({
  id: { type: ObjectId },
  TenPhongChieu: { type: String, required: true, trim: true }, // Tên phòng chiếu
  SoGhe: { type: Number, required: true, min: 0 }, // Số lượng ghế
  rap: { type: ObjectId, ref: "rap", required: true }, // Tham chiếu tới bảng Rạp
  TrangThai: {
    type: String,
    enum: ["Hoạt động", "Bảo trì"],
    default: "Hoạt động",
  }, // Trạng thái phòng chiếu
});

module.exports =
  mongoose.models.phongchieu || mongoose.model("phongchieu", phongchieu);
