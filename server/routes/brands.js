const express = require('express');
const router = express.Router();
const multer = require('multer');
const Brand = require('../models/Brand');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        return cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const randomNum = Math.floor(Math.random() * 1000);
        return cb(null, 'brand' + randomNum + '_' + file.originalname);
    }
});
const upload = multer({ storage: storage }).single('brand_img');

router.post('/insert', upload, async (req, res) => {
    try {
        const { brand_name } = req.body;
        const brandImg = req.file ? `${req.file.filename}` : null;

        const newData = new Brand({ brand_name, imgUrl: brandImg });
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
            if (error.message.includes("brand_name")) {
                return res.send({
                    status: 0,
                    message: "Brand already exists.",
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
        const allData = await Brand.find();
        res.json(allData);
    } catch (error) {
        console.log(error, 'server error')
    }
});
router.put('/update/:id', upload, async (req, res) => {
    try {
        const id = req.params.id;
        const { brand_name } = req.body;
        const newImg = req.file.filename;
        const result = await Brand.findByIdAndUpdate(
            { _id: id },
            { brand_name, imgUrl: newImg },
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
        const thatdata = await Brand.findByIdAndDelete(id);
        return res.send({ status: 1, message: "Data delete successfully!", data: "" });
    } catch (error) {
        console.log(error, 'server error')
    }
});

module.exports = router;