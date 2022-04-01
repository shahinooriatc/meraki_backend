'use strict';

const AttendanceService = require("../services/attendance.service");
const moment = require("moment");
const mongoose = require("mongoose");

exports.fetchAllAttendances = async (req, res) => {
    const { user, sort, page, limit, department, designation, date } = req.query;
    const queries = {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 20,
        sort: { name: -1 },
        query: []
    };

    if (sort) {
        const field = sort.split(",");

        queries.sort = {
            [field[0]]: parseInt(field[1])
        };
    }

    if (date) {
        queries.query.push({
            checkIn: {
                $gte: moment(new Date(date)).startOf('day').toDate(),
                $lt: moment(new Date(date)).endOf('day').toDate()
            }
        });
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

    let results = await AttendanceService.getAttendancesByQuery(queries);

    return res.status(200).send(results);
}

exports.fetchAttendanceUserToday = async (req, res) => {
    const { user } = req;

    // const result = await AttendanceService.getAttendanceByUser(user);
    // const today = result.find(item => moment(item.checkIn).isSame(new Date(), 'day'))

    return res.send([]);
}

exports.createAttendance = async (req, res) => {
    const { body } = req;

    const result = await AttendanceService.createAttendance(body);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send({
        message: "Successfully proceed data."
    });
}

exports.fetchAttendanceById = async (req, res) => {
    const { params } = req;

    const result = await AttendanceService.getAttendanceById(params.id);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send(result);
}

exports.fetchLoggedInAttendance = async (req, res) => {
    const { Attendance } = req;

    const result = await AttendanceService.getAttendanceById(Attendance);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send(result);
}

exports.updateAttendance = async (req, res) => {
    const { params, body } = req;

    const result = await AttendanceService.updateAttendance(params.id, body);

    if (!result || result.n === 0) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send({
        message: "Successfully proceed data."
    });
}

exports.deleteAttendance = async (req, res) => {
    const { params } = req;

    const result = await AttendanceService.deleteAttendance(params.id);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send({
        message: "Successfully proceed data."
    });
}
