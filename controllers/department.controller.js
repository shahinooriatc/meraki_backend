'use strict';

const DepartmentService = require("../services/department.service");
const { DEPARTMENT } = require("../data/default");
const role = require('../constants/role');

exports.createDefaultDepartments = async () => {
    const Departments = await DepartmentService.getDepartmentsByQuery({});

    if (Departments.data.length === 0) {
        await DepartmentService.createManyDepartments(DEPARTMENT);
    }
}

exports.fetchAllDepartments = async (req, res) => {
    if (!req.role.some( e => [role.admin.id, role.humanresource.id].includes(e))) {
        return res.status(401).send('You have no permission to access this feature!');
    }

    const { keyword, sort, page, limit } = req.query;
    const queries = {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 20,
        sort: { name: -1 },
        query: {}
    };

    if (page) {
        queries.skip = limit;
    }

    if (keyword) {
        queries.query.name = { '$regex': '.*' + keyword + '.*', '$options': '$i' };
    }

    if (sort) {
        const field = sort.split(",");

        queries.sort = {
            [field[0]]: parseInt(field[1])
        };
    }

    const results = await DepartmentService.getDepartmentsByQuery(queries);

    return res.status(200).send(results);
}

exports.createDepartment = async (req, res) => {
    const { body } = req;

    const result = await DepartmentService.createDepartment(body);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send({
        message: "Successfully proceed data."
    });
}

exports.fetchDepartmentById = async (req, res) => {
    const { params } = req;

    const result = await DepartmentService.getDepartmentById(params.id);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send(result);
}

exports.fetchLoggedInDepartment = async (req, res) => {
    const { Department } = req;

    const result = await DepartmentService.getDepartmentById(Department);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send(result);
}

exports.updateDepartment = async (req, res) => {
    const { params, body } = req;

    const result = await DepartmentService.updateDepartment(params.id, body);

    if (!result || result.n === 0) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send({
        message: "Successfully proceed data."
    });
}

exports.deleteDepartment = async (req, res) => {
    const { params } = req;

    const result = await DepartmentService.deleteDepartment(params.id);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send({
        message: "Successfully proceed data."
    });
}
