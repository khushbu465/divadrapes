const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.post('/insert', async (req, res) => {
    try {
        const { category, sub_category } = req.body;
        const newData = new Category({ category, sub_category });
        const result = await newData.save();
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
            if (error.message.includes("category")) {
                return res.send({
                    status: 0,
                    message: "category already exists.",
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
        const allData = await Category.find();
        res.json(allData);
    } catch (error) {
        console.log(error, 'server error')
    }
});
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { category, sub_category } = req.body;
        const result = await Category.findByIdAndUpdate(
            { _id: id },
            { category, sub_category },
            { new: true });
        if (!result) {
            res.send({ status: 0, message: "Something went wrong.", data: "" });
        } else {
            res.send({
                status: 1,
                message: "Data updated successfully.",
                data: result,
            });
        }
    } catch (error) {
        if (error.message.includes("duplicate key")) {
            res.send({
                status: 0,
                message: "Data already exists.",
                data: "",
            });
        } else {
            res.send({ status: 0, message: "Something went wrong.", data: "" });
        }
    }
});
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const thatdata = await Category.findByIdAndDelete(id);
        return res.send({ status: 1, message: "Data delete successfully!", data: "" });
    } catch (error) {
        console.log(error, 'server error')
    }
});
module.exports = router;