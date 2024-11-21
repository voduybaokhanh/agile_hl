const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ve = new Schema(
  {
    id: { type: ObjectId },
    gheNgoi: { type: String, required: true, trim: true },
    giaVe: { type: Number, required: true, min: 0 },
    suatChieu: { type: ObjectId, ref: "suatChieu", required: true },
    user: { type: ObjectId, ref: "user", required: true },
  },
  { timestamps: true } // Thêm createdAt và updatedAt
);

module.exports = mongoose.models.ve || mongoose.model("ve", ve);
