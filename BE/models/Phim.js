const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const phim = new Schema({
    id: { type: ObjectId }, 
    tenPhim: { type: String, required: true },
    moTa: { type: String },
    thoiLuong: { type: Number },
    theLoai: { type: String },
    ngayPhatHanh: { type: Date },
    trailer: { type: String },
    admin: { type: ObjectId, ref: 'admin'}, 
});

module.exports = mongoose.models.phim || mongoose.model('phim', phim);
