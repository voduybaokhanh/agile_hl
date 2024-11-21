const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const khuyenMai = new Schema(
  {
    id: { type: ObjectId },
    tieuDe: { type: String, required: true },
    noiDung: { type: String, required: true },
    mucGiamGia: { type: Number, required: true },
    loaiKhuyenMai: {
      type: String,
      enum: ["percent", "amount"],
      required: true,
    },
    maKhuyenMai: { type: String, unique: true },
    ngayBatDau: { type: Date, required: true },
    ngayKetThuc: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.ngayBatDau;
        },
        message: "Ngày kết thúc phải lớn hơn ngày bắt đầu",
      },
    },
    trangThai: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    admin: { type: ObjectId, ref: "admin", required: true },
  },
  { timestamps: true }
); // Thêm createdAt và updatedAt

module.exports =
  mongoose.models.khuyenMai || mongoose.model("khuyenMai", khuyenMai);
