'use strict';

const { db } = require("../models")
const Designation = db.designation;

exports.createManyDesignations = async (data) => {
    return Designation.insertMany(await Promise.all(data));
}

exports.getDesignationsByQuery = async (queries) => {
    const limit = queries.limit ?? 20;
    const page = queries.page ?? 1;
    const skip = limit * (page - 1);
    const sort = queries.sort ?? { createdAt: -1 };
    const query = queries.query ?? {};

    const results = await Designation.
    find(query).
    skip(skip).
    limit(limit).
    sort(sort)
    const counts = await Designation.countDocuments(query);

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

exports.createDesignation = async (data) => await Designation.create(data).then((result) => result);

exports.getDesignationById = async (id) => await Designation.findById(id)

exports.updateDesignation = async (id, data) => await Designation.findByIdAndUpdate(id, data)

exports.deleteDesignation = async (id) => await Designation.findByIdAndDelete(id)
