'use strict';

const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth.controller');

module.exports = (app) => {
    router.post("/", auth.login);

    app.use("/api/login", router);
};
