'use strict';

const { db } = require("../models")
const Department = db.department;

exports.createManyDepartments = async (data) => {
    return Department.insertMany(await Promise.all(data));
}

exports.getDepartmentsByQuery = async (queries) => {
    const limit = queries.limit ?? 20;
    const page = queries.page ?? 1;
    const skip = limit * (page - 1);
    const sort = queries.sort ?? { createdAt: -1 };
    const query = queries.query ?? {};

    const results = await Department.
    find(query).
    skip(skip).
    limit(limit).
    sort(sort)
    const counts = await Department.countDocuments(query);

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

exports.createDepartment = async (data) => await Department.create(data).then((result) => result);

exports.getDepartmentById = async (id) => await Department.findById(id)

exports.updateDepartment = async (id, data) => await Department.findByIdAndUpdate(id, data)

exports.deleteDepartment = async (id) => await Department.findByIdAndDelete(id)
