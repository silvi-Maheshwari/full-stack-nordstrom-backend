const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usermodel = require('../models/usermodel');
const userRouter = express.Router();
const secretkey=process.env.secretkey
// const usermodel = require('../modules/user');
var salt = bcrypt.genSaltSync(10);
userRouter.post('/register', async (req, res) => {
    try {
        // Check if email already exists
        const existingUser = await usermodel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists." });
        }

        var hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        let user = await usermodel.create(req.body); // Use create instead of insertMany for single user
        res.json({ msg: "Signup successful!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Signup failed. Please try again." });
    }
});


userRouter.post('/login', async (req, res) => {
    try {
        // Find user by email
        const userdata = await usermodel.findOne({ email: req.body.email });
        if (!userdata) {
            return res.status(400).json({ msg: "User not found" });
        }

        // Compare password
        const isPasswordValid = bcrypt.compareSync(req.body.password, userdata.password);
        if (isPasswordValid) {
            const token = jwt.sign({ userid: userdata._id }, secretkey, { expiresIn: '1h' }); // Set an expiry for the token
            console.log("Token successfully generated", token);
            res.json({ msg: "User login successful", token });
        } else {
            res.status(400).json({ msg: "Wrong password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = userRouter;
