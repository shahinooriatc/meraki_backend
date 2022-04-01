'use strict';

const { db } = require("../models")
const Setting = db.setting;

exports.createSetting = async (data) => {
    return Setting.insertMany(await Promise.all(data));
}

exports.getSetting = async () => await Setting.find();

exports.updateSetting = async (id, data) => await Setting.findByIdAndUpdate(id, data);