'use strict';

const SettingService = require("../services/setting.service");
const { SETTING } = require("../data/default");
const role = require('../constants/role');

exports.createDefaultSetting = async () => {
    const setting = await SettingService.getSetting({});

    if (setting.length === 0) {
        await SettingService.createSetting(SETTING);
    }
}

exports.getSetting = async (req, res) => {
    const result = await SettingService.getSetting();

    return res.status(200).send(result[0]);
}

exports.updateSetting = async (req, res) => {
    const { params, body } = req;

    if (!req.role.some( e => [role.admin.id].includes(e))) {
        return res.status(401).send('You have no permission to access this feature!');
    }

    const result = await SettingService.updateSetting(params.id, body);

    if (!result || result.n === 0) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send({
        message: "Successfully proceed data."
    });
}