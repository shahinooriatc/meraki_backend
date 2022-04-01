'use strict';

const DesignationService = require("../services/designation.service");
const { DESIGNATION } = require("../data/default");

exports.createDefaultDesignations = async (res) => {
    const Designations = await DesignationService.getDesignationsByQuery({});

    if (Designations.data.length === 0) {
        await DesignationService.createManyDesignations(DESIGNATION);
    }
}

exports.fetchAllDesignations = async (req, res) => {
    const { keyword, sort, page, limit, department } = req.query;
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

    if (department) {
        queries.query.department = department;
    }

    const results = await DesignationService.getDesignationsByQuery(queries);

    return res.status(200).send(results);
}

exports.createDesignation = async (req, res) => {
    const { body } = req;

    const result = await DesignationService.createDesignation(body);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send({
        message: "Successfully proceed data."
    });
}

exports.fetchDesignationById = async (req, res) => {
    const { params } = req;

    const result = await DesignationService.getDesignationById(params.id);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send(result);
}

exports.fetchLoggedInDesignation = async (req, res) => {
    const { Designation } = req;

    const result = await DesignationService.getDesignationById(Designation);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send(result);
}

exports.updateDesignation = async (req, res) => {
    const { params, body } = req;

    const result = await DesignationService.updateDesignation(params.id, body);

    if (!result || result.n === 0) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send({
        message: "Successfully proceed data."
    });
}

exports.deleteDesignation = async (req, res) => {
    const { params } = req;

    const result = await DesignationService.deleteDesignation(params.id);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send({
        message: "Successfully proceed data."
    });
}
