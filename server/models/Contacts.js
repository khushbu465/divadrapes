const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    mobile: {
        type: String,
    },
    email: {
        type: String
    },
    subject: {
        type: String
    },
    msg: {
        type: String,
        trim: true
    },
},
    {
        timestamps: true
    });
const Contact = mongoose.model('contacts', contactSchema);
module.exports = Contact;