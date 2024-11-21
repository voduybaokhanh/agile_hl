const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const suatChieu = new Schema(
  {
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
    phim: { type: ObjectId, ref: "phim", required: true },
    phongchieu: { type: ObjectId, ref: "phongchieu", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.suatChieu || mongoose.model("suatChieu", suatChieu);
