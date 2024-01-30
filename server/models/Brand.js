const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    brand_name: { type: String, required: true, },
    imageUrl: String,
    is_active: {
        type: Boolean,
        default: true
    },
},
    {
        timestamps: true,
    });


const Brand = mongoose.model('brands', brandSchema);
module.exports = Brand