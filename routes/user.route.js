'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');

const user = require('../controllers/user.controller');

module.exports = (app) => {
    const FILE_PATH = 'uploads/';
    const storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, FILE_PATH),
        filename: (req, file, cb) => {
            const fileName = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, `${Math.floor(Math.random() * 10000)}-${fileName}`);
        },
    });
    const upload = multer({
        storage: storage
    }).single('avatar');

    router.get("/", user.fetchAllUsers);
    router.post("/", upload, user.createUser);
    router.get("/profile", user.fetchLoggedInUser);
    router.get("/:id", user.fetchUserById);
    router.patch("/:id", upload, user.updateUser);
    router.delete("/:id", user.deleteUser);

    app.use("/api/user", router);
};
