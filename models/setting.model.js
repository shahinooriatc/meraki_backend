'use strict';

const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    country: String,
    email: String,
    phone: String,
    leaveLimit: Number
}, { timestamps: true })

const Setting = mongoose.model("Setting", SettingSchema)

module.exports = Setting;