const express = require('express');
const router = express.Router();
const Offer = require('../models/Offer');

router.post('/insert', async (req, res) => {
    try {
        const { code, start_date, end_date, discount_type, discount_value } = req.body;
        const newoffer = new Offer({
            code, start_date, end_date, discount_type, discount_value
        });
        const result = await newoffer.save();
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
            if (error.message.includes("code")) {
                return res.send({
                    status: 0,
                    message: "Code already exists.",
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
        const allData = await Offer.find();
        res.json(allData);
    } catch (error) {
        console.log(error, 'server error');
    }
});
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { code, start_date, end_date, discount_type, discount_value } = req.body;

        const upData = await Offer.findByIdAndUpdate(
            { _id: id },
            { code, start_date, end_date, discount_type, discount_value },
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
        const dlData = await Offer.findByIdAndDelete(id);
        if (dlData) {
            res.json({ message: 'Offer deleted successfully!', deletenews: dlData });
        } else {
            res.status(404).json({ error: 'Data not found' });
        }
    } catch (err) {
        console.log(err, 'server error');
    }
});

module.exports = router;