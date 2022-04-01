'use strict';

const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        text: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    },
    deletedAt: Date
}, { timestamps: true })

const Department = mongoose.model("Department", DepartmentSchema)

module.exports = Department;