const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    min_cart_value: { type: String },
    is_unique_use: { type: String },
    coupon_code: { type: String },
    start_date: { type: Date },
    end_date: { type: Date },
    discount_type: { type: String },
    discount_value: { type: String },
    redeem_count: { type: String },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
});

const Coupon = mongoose.model("coupons", couponSchema);
module.exports = Coupon