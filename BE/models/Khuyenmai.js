const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const khuyenMai = new Schema({
    id: { type: ObjectId },
    tieuDe: { type: String, required: true },
    noiDung: { type: String, required: true },
    mucGiamGia: { type: Number, required: true },
    ngayBatDau: { type: Date, required: true },
    ngayKetThuc: { type: Date, required: true },
    user: { type: ObjectId, ref: 'user'}
});

module.exports = mongoose.models.khuyenMai || mongoose.model('khuyenMai', khuyenMai);
