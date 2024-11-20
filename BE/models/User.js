const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
    id: { type: ObjectId },
    ten: { type: String },
    email: { type: String },
    matkhau: { type: String },
    diemtichluy: { type: Number },
});

module.exports = mongoose.models.user || mongoose.model('user', user);