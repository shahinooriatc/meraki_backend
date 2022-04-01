'use strict';

const jwt = require("jsonwebtoken");
const UserService = require("../services/user.service");

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];

    if (token && token !== 'null') {
        const data = jwt.verify(token, secret);

        const user = await UserService.getUserById(data.id);

        if (!user) {
            return res.status(500).send({
                message: "Unable to access feature. Please login again!"
            })
        }

        // eslint-disable-next-line require-atomic-updates,no-underscore-dangle
        req.user = user._id;
        req.role = user.role;

        return next();
    }

    return res.status(500).send({
        message: "Please login first!"
    })
}
