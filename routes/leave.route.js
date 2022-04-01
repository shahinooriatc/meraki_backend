'use strict';

const express = require('express');
const router = express.Router();
const multer  = require('multer')().none();

const leave = require('../controllers/leave.controller');

module.exports = (app) => {
    router.get("/", leave.fetchAllLeaves);
    router.post("/", multer, leave.createLeave);
    router.get("/:id", leave.fetchLeaveById);
    router.patch("/:id", multer, leave.updateLeave);
    router.delete("/:id", leave.deleteLeave);

    app.use("/api/leave", router);
};
