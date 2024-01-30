const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    code: { type: String },
    start_date: { type: Date },
    end_date: { type: Date },
    discount_type: { type: String },
    discount_value: { type: Number },
    is_active: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
})
const Offer = mongoose.model('offers', offerSchema);
module.exports = Offer;