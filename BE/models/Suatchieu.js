const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const suatChieu = new Schema({
    id: { type: ObjectId },
    rap: { type: String, required: true },
    phongChieu: { type: String, required: true },
    thoiGianChieu: { type: Date, required: true },
    phim: { type: ObjectId, ref: 'phim'},
});

module.exports = mongoose.models.suatChieu || mongoose.model('suatChieu', suatChieu);
