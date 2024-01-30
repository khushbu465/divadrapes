const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');

router.post('/insert', async (req, res) => {
    try {
        const { min_cart_value, is_unique_use, coupon_code, start_date, end_date, discount_type, discount_value, redeem_count } = req.body;
        const newdata = new Coupon({
            min_cart_value, is_unique_use, coupon_code, start_date, end_date, discount_type, discount_value, redeem_count
        });
        const result = await newdata.save();
        if (!result) {
            return res.send({
                status: 0, message: "something went wrong", data: ""
            });
        }
        return res.send({
            status: 1, message: "Data saved successfully!", data: result
        })

    } catch (error) {
        if (error.message.includes("duplicate key")) {
            if (error.message.includes("coupon_code")) {
                return res.send({
                    status: 0,
                    message: "Coupon already exists.",
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
router.get('/getall', async (req, res) => {
    try {
        const allData = await Coupon.find();
        res.json(allData);
    } catch (error) {
        console.log(error, 'server error');
    }
});
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { min_cart_value, is_unique_use, coupon_code, start_date, end_date, discount_type, discount_value, redeem_count } = req.body;

        const upData = await Coupon.findByIdAndUpdate(
            { _id: id },
            { min_cart_value, is_unique_use, coupon_code, start_date, end_date, discount_type, discount_value, redeem_count },
            { new: true }
        )
        if (!upData) {
            return res.status(404).json({ error: 'This offer not found' });
        }
        const newoffer = await upData.save();
        if (!newoffer) {
            return res.send({
                status: 0,
                message: "Something went wrong.",
                data: "",
            });
        }
        return res.send({
            status: 1,
            message: "Data updatee successfully!",
            data: newoffer,
        });
    } catch (err) {
        console.log(err, 'server error');
    }
});
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const dlData = await Coupon.findByIdAndDelete(id);
        if (dlData) {
            res.json({ message: 'Coupon deleted successfully!', deletenews: dlData });
        } else {
            res.status(404).json({ error: 'Data not found' });
        }
    } catch (err) {
        console.log(err, 'server error');
    }
});

module.exports = router;
