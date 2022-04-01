'use strict';

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        text: true
    },
    password: String,
    name: {
        type: String,
        text: true
    },
    phone: String,
    avatar: {
        type: String,
        default: ""
    },
    country: Object,
    city: String,
    address: String,
    gender: String,
    birthday: String,
    description: String,
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    },
    designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Designation"
    },
    role: Array,
    status: Number,
    lastActive: Date,
    deletedAt: Date
}, { timestamps: true })

const User = mongoose.model("User", UserSchema)

module.exports = User;