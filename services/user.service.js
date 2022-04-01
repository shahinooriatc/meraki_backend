'use strict';

const bcrypt = require('bcryptjs');
const { db } = require("../models")
const User = db.user;

exports.createManyUsers = async (data) => {
    const datas = [];
    for (const item of data) {
        datas.push({
            ...item,
            password: bcrypt.hashSync(item.password, 8)
        });
    }

    return User.insertMany(await Promise.all(datas));
}

exports.getUsersByQuery = async (queries) => {
    const limit = queries.limit ?? 20;
    const page = queries.page ?? 1;
    const skip = limit * (page - 1);
    const sort = queries.sort ?? { createdAt: -1 };
    const query = queries.query ?? {};

    const results = await User.
    find(query).
    skip(skip).
    limit(limit).
    sort(sort).
    populate({ path: "department", select: "name" }).
        populate({ path: "designation", select: "name" })
    const counts = await User.countDocuments(query);

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

exports.createUser = async (data) => await User.create(data).then((result) => result);

exports.getUserById = async (id) => await User.findById(id).
populate({ path: "department", select: "name" }).
populate({ path: "designation", select: "name" })

exports.updateUser = async (id, data) => await User.findByIdAndUpdate(id, data)

exports.deleteUser = async (id) => await User.findByIdAndDelete(id)

