const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ve = new Schema({
    id: { type: ObjectId },
    gheNgoi: { type: String, required: true },
    giaVe: { type: Number, required: true },
    suatChieu: { type: ObjectId, ref: 'suatChieu',required: true},
    gioHang: { type: ObjectId, ref: 'gioHang',required: true}
});

module.exports = mongoose.models.ve || mongoose.model('ve', ve);
