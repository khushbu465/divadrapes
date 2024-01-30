const express = require('express');
const router = express.Router();
const AdminUser = require('../models/Adminuser');

router.post('/insert', async (req, res) => {
    try {
        const { username, password } = req.body;
        const adminuser = new AdminUser({ username, password });
        const result = await adminuser.save();

        const { token, token_expiry } = await adminuser.generateAuthToken();
        const response = { username: adminuser.username, token, token_expiry };

        return res.send({
            status: 1,
            message: "User registered successfully.",
            data: result,
        });
    } catch (error) {
        if (error.message.includes("duplicate key")) {
            if (error.message.includes("username:")) {
                return res.send({
                    status: 0,
                    message: "Username already exists.",
                    data: "",
                });
            }
        } else {
            return res.send({
                status: 0,
                message: error.message,
                data: "",
            });
        }
    }
});
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password)
        const adminuser = await AdminUser.login(username, password);
        if (!adminuser) {
            return res.send({ error: "Login failed! Check authentication credentials", });
        }
        const { token, token_expiry } = await adminuser.generateAuthToken();
        const response = {
            username: adminuser.username,
            token,
            token_expiry,
        };
        return res.send({
            status: 1,
            message: "Login successful.",
            data: response,
        });
    } catch (error) {
        return res.send({ status: 0, message: error.message, data: "" });
    }
});
// // Log user out of the application
router.post("/logout", async (req, res) => {
    try {
        req.adminuser.tokens = req.adminuser.tokens.filter((token) => {
            return token.token != req.token;
        });
        await req.adminuser.save();
        return res.send({ status: 1, message: "Logout successfully.", data: "" });
    } catch (error) {
        return res.send({ status: 0, message: error.message, data: "" });
    }
});
router.post("/logoutall", async (req, res) => {
    // Log user out of all devices
    try {
        req.adminuser.tokens.splice(0, req.adminuser.tokens.length);
        await req.adminuser.save();
        return res.send({
            status: 1,
            message: "Logout from all devices successfully.",
            data: "",
        });
    } catch (error) {
        return res.send({ status: 0, message: "Something went wrong.", data: "" });
    }
});
router.post("/changepassword", async (req, res) => {
    try {
        const { oldpwd, newpwd } = req.body;
        const adminuser = await AdminUser.changepassword(
            req.adminuser.username,
            oldpwd,
            newpwd
        );

        if (!adminuser) {
            return res.send({ status: 0, message: "Data does not exist.", data: "" });
        } else {
            return res.send({
                status: 1,
                message: "Password updated successfully.",
                data: "",
            });
        }
    } catch (error) {
        return res.send({ status: 0, message: error.message, data: "" });
    }
});
router.post("/resetpassword", async (req, res) => {
    try {
        if (req.adminuser.role != "Admin") {
            return res.send({
                status: 0,
                message: "Only Admin can reset passwords.",
                data: "",
            });
        } else {
            const { username, newpwd } = req.body;
            const adminuser = await AdminUser.resetpassword(username, newpwd);

            if (!adminuser) {
                return res.send({
                    status: 0,
                    message: "Something went wrong.",
                    data: "",
                });
            } else {
                return res.send({
                    status: 1,
                    message: "Password updated successfully.",
                    data: "",
                });
            }
        }
    } catch (error) {
        return res.send({ status: 0, message: error.message, data: "" });
    }
});

module.exports = router;