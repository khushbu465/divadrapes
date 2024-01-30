const mongoose = require('mongoose');
const moment = require("moment");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const adminuserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
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
adminuserSchema.pre("save", async function (next) {
    const adminuser = this;
    if (adminuser.isModified('password')) {
        adminuser.password = await bcrypt.hash(adminuser.password, 9);
    }
    next();
});
// generate auth token 
adminuserSchema.methods.generateAuthToken = async function () {
    const adminuser = this;
    const token = jwt.sign({ _id: adminuser._id }, 'divadrapes');
    const token_expiry = moment().add(1, "day");
    adminuser.tokens = adminuser.tokens.concat({
        token,
        token_expiry,
    });
    await adminuser.save();
    return { token, token_expiry };
};

adminuserSchema.statics.login = async (username, password) => {
    const adminuser = await AdminUser.findOne({ username });
    if (!adminuser) {
        throw new Error("Invalid credentials.");
    }
    const isPasswordMatch = await bcrypt.compare(password, adminuser.password);
    if (!isPasswordMatch) {
        throw new Error("Invalid credentials.");
    }
    return adminuser;
};
adminuserSchema.statics.changepassword = async (username, oldpwd, newpwd) => {
    var adminuser = await AdminUser.findOne({ username });
    if (!adminuser) {
        throw new Error("Invalid user.");
    }
    const isPasswordMatch = await bcrypt.compare(oldpwd, adminuser.pwd);
    if (!isPasswordMatch) {
        throw new Error("Invalid old password.");
    } else {
        adminuser = await AdminUser.findOneAndUpdate(
            { username },
            { pwd: await bcrypt.hash(newpwd, 9) },
            { new: true }
        );
    }

    return adminuser;
};

adminuserSchema.statics.resetpassword = async (username, newpwd) => {
    var adminuser = await AdminUser.findOne({ username });
    if (!adminuser) {
        throw new Error("Invalid user.");
    }

    adminuser = await AdminUser.findOneAndUpdate(
        { username },
        { pwd: await bcrypt.hash(newpwd, 9) },
        { new: true }
    );
    return adminuser;
};

const AdminUser = mongoose.model("adminusers", adminuserSchema)
module.exports = AdminUser;
