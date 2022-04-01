'use strict';

const express = require('express');
const router = express.Router();
const multer  = require('multer')().none();

const setting = require('../controllers/setting.controller');

module.exports = (app) => {
    router.get("/", setting.getSetting);
    router.patch("/:id", multer, setting.updateSetting);

    app.use("/api/setting", router);
};
