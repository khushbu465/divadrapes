const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    sub_category: {
        type: String,
        required: true,
    },
    model_name: {
        type: String,
    },
    mrp: {
        type: String,
    },
    discount: {
        type: String,
    },
    offer: {
        type: String,
    },
    brand: {
        type: String,
    },
    stock: {
        type: Number,
    },
    highlights: {
        type: String,
    },
    short_description: { type: String },
    descriptions: {
        type: String,
    },
    variant_details: [{
        variantSize: {
            type: String,
        },
        variantColor: {
            type: String,
        },
        variantPrice: {
            type: Number,
        },
        variantImgUrl: {
            type: [String]
        },
    }],
    ratings: { type: String },
    reviews: { type: String },
    new_label: { type: Boolean },
    top_label: { type: Boolean },
    is_active: { type: Boolean },
    manufacturer: { type: String },
    packer: { type: String },
    itemweight: { type: String },
    genericname: { type: String },
    cancel_policy: { type: Boolean },
    cancel_limit: { type: Number },
    return_policy: { type: Boolean },
    return_limit: { type: Number },
    is_active: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;