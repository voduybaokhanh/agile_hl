const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const tichDiem = new Schema({
    id: { type: ObjectId },
    diemCong: { type: Number, default: 0 },
    diemTru: { type: Number, default: 0 },
    ngayGiaoDich: { type: Date, default: Date.now },
    user: { type: ObjectId, ref: 'user'}
});

module.exports = mongoose.models.tichDiem || mongoose.model('tichDiem', tichDiem);
