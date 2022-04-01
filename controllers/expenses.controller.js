'use strict';

const ExpensesService = require("../services/expenses.service");

exports.fetchAllExpenses = async (req, res) => {
    const { keyword, sort, page, limit, startAt, endAt, status } = req.query;
    const queries = {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 20,
        sort: { name: -1 },
        query: {}
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

    if (startAt && endAt) {
        queries.query.date = { $gte: startAt, $lt: endAt }
    }

    if (status) {
        queries.query.status = status;
    }

    const results = await ExpensesService.getExpensesByQuery(queries);

    return res.status(200).send(results);
}

exports.createExpenses = async (req, res) => {
    const { body } = req;

    const result = await ExpensesService.createExpenses(body);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send({
        message: "Successfully proceed data."
    });
}

exports.fetchExpensesById = async (req, res) => {
    const { params } = req;

    const result = await ExpensesService.getExpensesById(params.id);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send(result);
}

exports.fetchLoggedInExpenses = async (req, res) => {
    const { Expenses } = req;

    const result = await ExpensesService.getExpensesById(Expenses);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send(result);
}

exports.updateExpenses = async (req, res) => {
    const { params, body } = req;

    const result = await ExpensesService.updateExpenses(params.id, body);

    if (!result || result.n === 0) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send({
        message: "Successfully proceed data."
    });
}

exports.deleteExpenses = async (req, res) => {
    const { params } = req;

    const result = await ExpensesService.deleteExpenses(params.id);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send({
        message: "Successfully proceed data."
    });
}
