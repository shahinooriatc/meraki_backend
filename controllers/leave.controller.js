'use strict';

const LeaveService = require("../services/leave.service");
const mongoose = require("mongoose");

exports.fetchAllLeaves = async (req, res) => {
    const { keyword, sort, page, limit, user, department, designation } = req.query;
    const queries = {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 20,
        sort: { name: -1 },
        query: []
    };

    if (keyword) {
        queries.query.name = { '$regex': '.*' + keyword + '.*', '$options': '$i' };
    }

    if (sort) {
        const field = sort.split(",");

        queries.sort = {
            [field[0]]: parseInt(field[1])
        };
    }

    if (user) {
        queries.query.push({ 'user._id': mongoose.Types.ObjectId(user) });
    }

    if (department) {
        queries.query.push({ 'user.department': mongoose.Types.ObjectId(department) })
    }

    if (designation) {
        queries.query.push({ 'user.designation': mongoose.Types.ObjectId(designation) })
    }

    const results = await LeaveService.getLeavesByQuery(queries);

    return res.status(200).send(results);
}

exports.createLeave = async (req, res) => {
    const { body } = req;

    const result = await LeaveService.createLeave(body);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send({
        message: "Successfully proceed data."
    });
}

exports.fetchLeaveById = async (req, res) => {
    const { params } = req;

    const result = await LeaveService.getLeaveById(params.id);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send(result);
}

exports.fetchLoggedInLeave = async (req, res) => {
    const { Leave } = req;

    const result = await LeaveService.getLeaveById(Leave);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send(result);
}

exports.updateLeave = async (req, res) => {
    const { params, body } = req;

    const result = await LeaveService.updateLeave(params.id, body);

    if (!result || result.n === 0) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send({
        message: "Successfully proceed data."
    });
}

exports.deleteLeave = async (req, res) => {
    const { params } = req;

    const result = await LeaveService.deleteLeave(params.id);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send({
        message: "Successfully proceed data."
    });
}
