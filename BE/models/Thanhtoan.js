const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const thanhtoan = new Schema(
  {
    id: { type: ObjectId },
    PhuongThucThanhToan: {
      type: String,
      required: true,
      enum: ["Tiền mặt", "Chuyển khoản", "Ví điện tử"], // Giới hạn phương thức thanh toán
    },
    NgayThanhToan: {
      type: Date,
      required: true,
      default: Date.now, // Nếu không cung cấp ngày thanh toán, sử dụng ngày hiện tại
    },
    TrangThai: {
      type: String,
      required: true,
      enum: ["Đã thanh toán", "Chưa thanh toán", "Hủy"], // Giới hạn trạng thái thanh toán
    },
    ve: {
      type: ObjectId,
      ref: "ve",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.thanhtoan || mongoose.model("thanhtoan", thanhtoan);
