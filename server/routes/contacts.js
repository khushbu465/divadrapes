const express = require('express');
const router = express.Router();
const Contact = require('../models/Contacts');

router.post('/insert', async (req, res) => {
    try {
        const { name, mobile, email, subject, msg } = req.body;
        const newdata = new Contact({ name, mobile, email, subject, msg });
        const saveData = await newdata.save();
        if (!saveData) {
            return res.send({ status: 0, message: "something went wrong", data: "" })
        }
        return res.send({ status: 1, message: "Data Saved Successfully!", data: saveData });
    } catch (error) {
        console.log(error, 'server error')
    }
});
router.get('/getall', async (req, res) => {
    try {
        const allData = await Contact.find();
        res.json(allData);
    } catch (error) {
        console.log(error, 'server error');
    }
});
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Contact.findByIdAndDelete(id);
        res.json(result);
        return res.send({
            status: 1, message: "Data delete successfully!", data: ""
        });
    } catch (error) {
        console.log(error, 'server error');
    }
})
module.exports = router;