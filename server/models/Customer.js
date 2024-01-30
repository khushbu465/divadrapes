const mongoose = require('mongoose');
const moment = require("moment");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const customersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", },
    addresses: [{
        _id: false,
        house_number: { type: String },
        street_address: { type: String },
        city: { type: String },
        pincode: { type: String }
    }],
    is_active: {
        type: Boolean,
        default: true
    },
    tokens: [
        {
            _id: false,
            token: { type: String, required: true },
            token_expiry: { type: Date, required: true },
        },
    ],
}, {
    timestamps: true,
});

// hasing the password
customersSchema.pre("save", async function (next) {
    // console.log('hihi');
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 9);
    }
    next();
});
// \\we are generating token==
customersSchema.methods.generateAuthToken = async function () {
    try {
        const user = this;
        const token = jwt.sign({ _id: user._id }, 'ECOM');
        const token_expiry = moment().add(1, "day");
        user.tokens = user.tokens.concat({
            token,
            token_expiry,
        });
        await user.save();
        return { token, token_expiry };
    } catch (err) {
        console.log(err);
    }
}
customersSchema.statics.login = async (mobile, password) => {
    const user = await Customer.findOne({ mobile });
    if (!user) {
        throw new Error("Invalid credentials.");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error("Invalid credentials.");
    }
    return user;
};
const Customer = mongoose.model('customers', customersSchema);
module.exports = Customer;