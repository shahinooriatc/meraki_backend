'use strict';

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthService = require("../services/auth.service");

const secret = process.env.JWT_SECRET;

exports.login = async (req, res) => {
    const { body } = req;

    const result = await AuthService.login(body);

    if (!result) {
        return res.status(500).send({
            message: "User not found!"
        })
    }

    const passwordValid = await bcrypt.compare(
        body.password,
        result.password
    );

    if (!passwordValid) {
        return res.status(500).send({
            message: 'Wrong password!'
        });
    }

    const token = jwt.sign(
        { id: result._id },
        secret
    );

    return res.status(200).send({
        message: "Successfully logged in.",
        token
    });
}