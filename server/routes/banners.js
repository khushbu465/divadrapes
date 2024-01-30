const express = require('express');
const router = express.Router();
const multer = require('multer');
const Banner = require('../models/Banner');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        return cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const randomNum = Math.floor(Math.random() * 1000);
        return cb(null, 'banner' + randomNum + '_' + file.originalname);
    }
});
const upload = multer({ storage: storage }).single('banner_img');

router.post('/insert', upload, async (req, res) => {
    try {
        const bannerimg = req.file ? `${req.file.filename}` : null;
        // console.log(sliderimg)
        const newImg = new Banner({ imgUrl: bannerimg });
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
router.get('/getall', auth, async (req, res) => {
    try {
        const allImg = await Banner.find();
        const result = res.json(allImg);
    } catch (err) {
        console.log(err, 'server error');
    }
});
router.put('/update/:id', upload, async (req, res) => {
    try {
        const id = req.params.id;
        const newImg = req.file.filename;
        const upImg = await Banner.findByIdAndUpdate(
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
        const results = await Banner.findByIdAndDelete(id);
        if (results) {
            res.json({ status: 1, message: 'Image delete successfully!', data: results })
        } else {
            res.status(404).json({ error: "Image not found!" })
        }
    } catch (err) {
        console.log(err, 'server error');
    }
});

module.exports = router;