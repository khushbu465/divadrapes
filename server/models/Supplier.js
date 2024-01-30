const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema({
    code: { type: String },
    company_name: { type: String },
    mobile: { type: String },
    email: { type: String },
    address: { type: String },
    is_active: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true,
});
const Supplier = mongoose.model('suppliers', supplierSchema);
module.exports = Supplier