const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
    id: { type: ObjectId },
    ten: {
        type: String,
        required: [true, 'Tên không được để trống'],
        minlength: [2, 'Tên phải có ít nhất 2 ký tự'],
        maxlength: [50, 'Tên không được vượt quá 50 ký tự'],
    },
    email: {
        type: String,
        required: [true, 'Email không được để trống'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Email không hợp lệ'],
    },
    matkhau: {
        type: String,
        required: [true, 'Mật khẩu không được để trống']
    },
    diemtichluy: {
        type: Number,
        default: 0,
        min: [0, 'Điểm tích lũy không được âm'],
    },
},
    { timestamps: true } // Thêm createdAt và updatedAt
);


module.exports = mongoose.models.user || mongoose.model('user', user);