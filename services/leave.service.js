'use strict';

const { db } = require("../models")
const Leave = db.leave;

exports.createManyLeaves = async (data) => {
    return Leave.insertMany(await Promise.all(data));
}

exports.getLeavesByQuery = async (queries) => {
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

    const results = await Leave.
    aggregate(aggregate).
    skip(skip).
    limit(limit).
    sort(sort)
    const counts = await Leave.countDocuments(query);

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

exports.createLeave = async (data) => await Leave.create(data).then((result) => result);

exports.getLeaveById = async (id) => await Leave.findById(id)

exports.updateLeave = async (id, data) => await Leave.findByIdAndUpdate(id, data)

exports.deleteLeave = async (id) => await Leave.findByIdAndDelete(id)
