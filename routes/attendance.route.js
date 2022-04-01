'use strict';

const express = require('express');
const router = express.Router();
const multer  = require('multer')().none();

const attendance = require('../controllers/attendance.controller');

module.exports = (app) => {
    router.get("/", attendance.fetchAllAttendances);
    router.get("/today", attendance.fetchAttendanceUserToday);
    router.post("/", multer, attendance.createAttendance);
    router.get("/:id", attendance.fetchAttendanceById);
    router.patch("/:id", multer, attendance.updateAttendance);
    router.delete("/:id", attendance.deleteAttendance);

    app.use("/api/attendance", router);
};
