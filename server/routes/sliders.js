const express = require('express');
const router = express.Router();
const multer = require('multer');
const Slider = require('../models/Slider');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        return cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const randomNum = Math.floor(Math.random() * 1000);
        return cb(null, 'slider' + randomNum + '_' + file.originalname);
    }
});
const upload = multer({ storage: storage }).single('slider_img');

router.post('/insert', upload, async (req, res) => {
    try {
        const sliderimg = req.file ? `${req.file.filename}` : null;
        // console.log(sliderimg)
        const newImg = new Slider({ imgUrl: sliderimg });
        const savedImg = await newImg.save();
        if (!savedImg) {
            return res.send({
                status: 0,
                message: "something went wrong!",
                data: "",
            })
        }
        return res.send({
            status: 1,
            message: "Data Saved!",
            data: savedImg,
        })
    } catch (err) {
        console.log('server error', err)
    }
});
router.get('/getall', async (req, res) => {
    try {
        const allImg = await Slider.find();
        const result = res.json(allImg);
    } catch (err) {
        console.log(err, 'server error');
    }
});
router.put('/update/:id', upload, async (req, res) => {
    try {
        const id = req.params.id;
        const newImg = req.file.filename;
        const upImg = await Slider.findByIdAndUpdate(
            { _id: id },
            { imgUrl: newImg },
            { new: true }
        );
        if (!upImg) {
            return res.status(404).json({ error: "Image not found!" });
        }
        return res.send({
            status: 1,
            message: "Image update successfully!",
            data: upImg,
        })
    } catch (error) {
        console.log(error, 'server error');
    }
});
router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const results = await Slider.findByIdAndDelete(id);
        if (results) {
            res.json({ status: 1, message: 'Image delete successfully!', data: results })
        } else {
            res.status(404).json({ error: "Image not found!" })
        }
    } catch (err) {
        console.log(err, 'server error');
    }
})

module.exports = router;