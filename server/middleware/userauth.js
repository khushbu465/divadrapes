const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");

const userauth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const data = jwt.verify(token, 'ECOM');

        const customer = await Customer.findOne({
            _id: data._id,
            "tokens.token": token,
            "tokens.token_expiry": { $gte: new Date() },
        });
        if (!customer) {
            throw new Error("invalid token");
        }

        req.customer = customer;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ status: 0, message: error.message, data: "" });
    }
};
module.exports = userauth;
