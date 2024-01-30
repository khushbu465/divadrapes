const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

router.post('/insert', async (req, res) => {
    try {
        const { name, mobile, email, password, addresses } = req.body;

        const newcustomers = new Customer({ name, mobile, email, password, addresses });
        const savedData = await newcustomers.save();
        if (!savedData) {
            return res.send({ status: 0, message: "something went wrong", data: "" });
        }
        return res.send({ status: 1, message: "Customer registered successfully", data: savedData });

    } catch (error) {
        if (error.message.includes("duplicate key")) {
            if (error.message.includes("mobile")) {
                return res.send({
                    status: 0,
                    message: "Mobile Number already exists.",
                    data: "",
                });
            } else if (error.message.includes("email")) {
                return res.send({
                    status: 0,
                    message: "Email already exists.",
                    data: "",
                });
            }
        } else {
            return res.send({
                status: 0,
                message: error.message,
                data: error,
            });
        }
    }
});
router.post("/login", async (req, res) => {
    try {
        const { mobile, password } = req.body;
        const user = await Customer.login(mobile, password);
        if (!user) {
            return res.send({ error: "Login failed! Check authentication credentials", });
        }
        const { token, token_expiry } = await user.generateAuthToken();
        const response = {
            mobile: user.mobile,
            token,
            token_expiry,
        };
        return res.send({
            status: 1,
            message: "Login successful.",
            data: response,
        });
    } catch (err) {
        console.log(err, 'server error');
    }
});
router.get('/getall', async (req, res) => {
    try {
        const allUser = await Customer.find();
        res.json(allUser);
    } catch (error) {
        console.log(error, 'server error')
    }
});
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Customer.findByIdAndDelete(id);
        if (result) {
            res.json({ message: 'Customer deleted successfully!', deletedUser: result });
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        console.log(error, 'server error')
    }
});

module.exports = router
