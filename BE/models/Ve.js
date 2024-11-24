const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ve = new Schema(
  {
    id: { type: ObjectId },
    gheNgoi: {
      type: String,
      required: true,
      trim: true, // Loại bỏ khoảng trắng thừa
    },
    giaVe: {
      type: Number,
      required: true,
      min: 0, // Giá vé không thể âm
    },
    suatchieu: {
      type: Schema.Types.ObjectId,
      ref: "suatchieu",
      required: true, // Tham chiếu tới bảng Suất Chiếu
    },
    user: {
      type: ObjectId,
      ref: "user",
      required: true, // Tham chiếu tới bảng User
    },
  },
  { timestamps: true } // Tự động thêm trường createdAt và updatedAt
);
module.exports = mongoose.models.ve || mongoose.model("ve", ve);
