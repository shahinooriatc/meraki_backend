'use strict';

const mongoose = require("mongoose");

const DesignationSchema = new mongoose.Schema({
    name: {
        type: String,
        text: true
    },
    description: String,
    deletedAt: Date
}, { timestamps: true })

const Designation = mongoose.model("Designation", DesignationSchema)

module.exports = Designation;