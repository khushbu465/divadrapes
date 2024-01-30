const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/insert', async (req, res) => {
    try {
        const { name, title, category, sub_category, model_name, mrp, discount,
            offer, brand, quantity, stock, highlights, short_description, descriptions, variant_details, new_label,
            top_label, manufacturer, packer, itemweight, genericname, cancel_policy, cancel_limit, return_policyreturn_limit } = req.body;

        const newproduct = new Product({
            name, title, category, sub_category, model_name, mrp, discount,
            offer, brand, quantity, stock, highlights, short_description, descriptions, variant_details, new_label,
            top_label, manufacturer, packer, itemweight, genericname, cancel_policy, cancel_limit, return_policyreturn_limit
        });
        const saveddata = await newproduct.save();
        if (!saveddata) {
            return res.send({
                status: 0,
                message: "something wen wrong",
                data: "",
            });
        }
        return res.send({
            status: 1,
            message: "Data saved Successfully!",
            data: saveddata,
        })
    } catch (err) {
        console.log('server error', err);
    }
});
router.get('/getall', async (req, res) => {
    try {
        const allData = await Product.find();
        res.json(allData);
    } catch (err) {
        console.log(err, 'server error');
    }
});
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Product.findByIdAndUpdate(
            { _id: id }, {},
            { new: true })
    } catch (err) {
        console.log(err, 'server error');
    }
});
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Product.findByIdAndDelete(id);
        if (result) {
            res.json({ message: 'Product deleted successfully!', deletenews: result });
        } else {
            res.status(404).json({ error: 'product not found' });
        }
    } catch (error) {
        console.log(error, 'server error');
    }
});

module.exports = router