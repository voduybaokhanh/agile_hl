const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const tichDiem = new Schema({
  id: { type: ObjectId },
  diem: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return Number.isInteger(value); // Điểm phải là số nguyên
      },
      message: "Điểm phải là số nguyên.",
    },
  },
  loaiGiaoDich: {
    type: String,
    enum: ["cong", "tru", "khuyenMai", "khac"], // Các loại giao dịch
    required: true,
  },
  ngayGiaoDich: { type: Date, default: Date.now },
  ghiChu: { type: String }, // Thông tin chi tiết giao dịch
  user: { type: ObjectId, ref: "user", required: true },
});

module.exports =
  mongoose.models.tichDiem || mongoose.model("tichDiem", tichDiem);
