const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    sub_category: [String],
    is_active: {
        type: Boolean,
        default: true
    },
},
    {
        timestamps: true,
    });

const Category = mongoose.model('categories', categorySchema);
module.exports = Category