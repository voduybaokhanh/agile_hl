const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const suatchieu = new Schema({
  id: { type: ObjectId },
  thoiGianChieu: { type: Number, required: true, min: 1 }, // Giờ chiếu
  phim: { type: ObjectId, ref: "phim", required: true }, // Tham chiếu tới bảng Phim
  rap: { type: ObjectId, ref: "rap", required: true }, // Tham chiếu tới bảng Rạp
});

module.exports =
  mongoose.models.suatchieu || mongoose.model("suatchieu", suatchieu);
