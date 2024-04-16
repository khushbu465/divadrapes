const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    imgUrl: {
        type: String,
    },
    imgtype: {
        type: String,
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
});

const Slider = mongoose.model("sliders", sliderSchema);
module.exports = Slider