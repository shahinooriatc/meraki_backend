'use strict';

const { db } = require("../models")
const Attendance = db.attendance;

exports.createManyAttendances = async (data) => {
    return Attendance.insertMany(await Promise.all(data));
}

exports.getAttendancesByQuery = async (queries) => {
    const limit = queries.limit ?? 20;
    const page = queries.page ?? 1;
    const skip = limit * (page - 1);
    const sort = queries.sort ?? { createdAt: -1 };
    const query = queries.query ?? [];

    const aggregate = [
        {
            $lookup: {
                from: 'users',
                let: { user: "$user" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$$user", "$_id"] }
                        }
                    },
                    { $project: { name: 1, department: 1, designation: 1 } }
                ],
                as: 'user'
            }
        },
        { $unwind: '$user' }
    ];

    if (query.length > 0) {
        aggregate.push({
            $match: {
                ...(query.length > 0 && {
                    $and: query
                })
            }
        })
    }

    const results = await Attendance.
    aggregate(aggregate).
    skip(skip).
    limit(limit).
    sort(sort)
    const counts = results.length;

    return {
        query,
        pagination: {
            perPage: limit,
            currentPage: page,
            counts,
            pages: Math.ceil(counts / limit)
        },
        data: results
    }
}

exports.createAttendance = async (data) => await Attendance.create(data).then((result) => result);

exports.getAttendanceById = async (id) => await Attendance.findById(id)

exports.updateAttendance = async (id, data) => await Attendance.findByIdAndUpdate(id, data)

exports.deleteAttendance = async (id) => await Attendance.findByIdAndDelete(id)
