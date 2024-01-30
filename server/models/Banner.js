const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    imgUrl: {
        type: String,
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
});

const Banner = mongoose.model("banners", bannerSchema);
module.exports = Banner