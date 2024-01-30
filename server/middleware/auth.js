const jwt = require("jsonwebtoken");
const AdminUser = require("../models/Adminuser");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const data = jwt.verify(token, 'divadrapes');

        const adminuser = await AdminUser.findOne({
            _id: data._id,
            "tokens.token": token,
            "tokens.token_expiry": { $gte: new Date() },
        });
        if (!adminuser) {
            throw new Error("invalid token");
        }

        req.adminuser = adminuser;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ status: 0, message: error.message, data: "" });
    }
};
module.exports = auth;
