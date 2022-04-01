'use strict';

const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    checkIn: Date,
    checkOut: Date,
    deletedAt: Date
}, { timestamps: true })

const Attendance = mongoose.model("Attendance", AttendanceSchema)

module.exports = Attendance;