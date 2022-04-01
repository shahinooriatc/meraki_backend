'use strict';

const { db } = require("../models")
const Expenses = db.expenses;

exports.createManyExpenses = async (data) => {
    return Expenses.insertMany(await Promise.all(data));
}

exports.getExpensesByQuery = async (queries) => {
    const limit = queries.limit ?? 20;
    const page = queries.page ?? 1;
    const skip = limit * (page - 1);
    const sort = queries.sort ?? { createdAt: -1 };
    const query = queries.query ?? {};

    const results = await Expenses.
    find(query).
    skip(skip).
    limit(limit).
    sort(sort).populate({
        path: 'createdBy'
    })
    const counts = await Expenses.countDocuments(query);

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

exports.createExpenses = async (data) => await Expenses.create(data).then((result) => result);

exports.getExpensesById = async (id) => await Expenses.findById(id)

exports.updateExpenses = async (id, data) => await Expenses.findByIdAndUpdate(id, data)

exports.deleteExpenses = async (id) => await Expenses.findByIdAndDelete(id)
