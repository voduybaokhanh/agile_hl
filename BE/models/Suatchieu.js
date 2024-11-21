const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const suatChieuSchema = new Schema(
  {
    rap: {
      type: String,
      required: true,
      enum: ["Rap 1", "Rap 2", "Rap 3"], // Giới hạn giá trị hợp lệ
    },
    phongChieu: {
      type: String,
      required: true,
      enum: ["Phòng 1", "Phòng 2", "Phòng 3"], // Tương tự như trên
    },
    thoiGianChieu: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > Date.now(); // Đảm bảo thời gian chiếu không ở quá khứ
        },
        message: "Thời gian chiếu phải lớn hơn hiện tại.",
      },
    },
    phim: {
      type: ObjectId,
      ref: "phim",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.suatChieu || mongoose.model("suatChieu", suatChieuSchema);
