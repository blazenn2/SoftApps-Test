const { validationResult } = require('express-validator');
const user = require('../models/user');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed, entered data is incorrect.");
            error.statusCode = 422;
            throw error;
        }
        const { name, email, password, accountType } = req.body;
        const encryptedPassword = await bycrypt.hash(password, 12);
        if (encryptedPassword) {
            const addUserToDatabase = await new user({ name: name, email: email, accountType: accountType, password: encryptedPassword }).save();
            if (addUserToDatabase) return res.json({ message: "User created successfully", user: addUserToDatabase })
        }

    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const getUser = await user.findOne({ email: req.body.email });
        if (!getUser) {
            const error = new Error("User not found!");
            error.statusCode = 500;
            throw error;
        }
        const comparePassword = await bycrypt.compare(req.body.password, getUser.password);
        if (!comparePassword) {
            const error = new Error("Invalid password!");
            error.statusCode = 500;
            throw error;

        };
        const accessToken = jwt.sign({ userId: getUser._id.toString(), email: getUser.email }, "secretkey");
        return res.status(200).json({ token: accessToken, userId: getUser._id.toString(), name: getUser.name, accountType: getUser.accountType });
    } catch (err) {
        next(err);
    }
};