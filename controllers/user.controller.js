'use strict';

const bcrypt = require("bcryptjs");
const UserService = require("../services/user.service");
const { USERS } = require("../data/default");
const fs = require('fs');

exports.createDefaultUsers = async () => {
    const users = await UserService.getUsersByQuery({});

    if (users.data.length === 0) {
        await UserService.createManyUsers(USERS);
    }
}

exports.fetchAllUsers = async (req, res) => {
    const { keyword, sort, page, limit, role, status, department, designation } = req.query;
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

    if (role) {
        queries.query.role = role ;
    }

    if (status) {
        queries.query.status = parseInt(status) ;
    }

    if (department) {
        queries.query.department = department;
    }

    if (designation) {
        queries.query.designation = designation;
    }

    const results = await UserService.getUsersByQuery(queries);

    return res.status(200).send(results);
}

exports.createUser = async (req, res) => {
    const { body } = req;

    body.password = bcrypt.hashSync(body.password, 8);
    body.role = body.role.split(',');

    const url = req.protocol + '://' + req.get('host') + '/uploads/';
    if (req.file) body.avatar = url + req.file.filename;

    const result = await UserService.createUser(body);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send({
        message: "Successfully proceed data."
    });
}

exports.fetchUserById = async (req, res) => {
    const { params } = req;

    const result = await UserService.getUserById(params.id);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send(result);
}

exports.fetchLoggedInUser = async (req, res) => {
    const { user } = req;

    const result = await UserService.getUserById(user);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send(result);
}

exports.updateUser = async (req, res) => {
    const { params, body } = req;

    if (body.password) {
        body.password = bcrypt.hashSync(body.password, 8);
    }

    if (body.role) {
        body.role = body.role.split(',');
    }

    const url = req.protocol + '://' + req.get('host') + '/uploads/';
    if (req.file) {
        body.avatar = url + req.file.filename;

        await UserService.getUserById(params.id).then(res => {
            if (res.avatar) {
                const image = res.avatar.split('/')
                const imageUrl = './uploads/' + image[image.length - 1]

                fs.stat(imageUrl, (err, stat) => {
                    if (stat) {
                        fs.unlink(imageUrl, (err) => {
                            if (err) {
                                res.send({
                                    status: 'failed',
                                    message: 'Failed to save image!',
                                });
                            }
                        })
                    }
                })
            }
        });
    }

    const result = await UserService.updateUser(params.id, body);

    if (!result || result.n === 0) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send({
        message: "Successfully proceed data."
    });
}

exports.deleteUser = async (req, res) => {
    const { params } = req;

    const result = await UserService.deleteUser(params.id);

    if (!result) {
        return res.status(500).send({
            message: "Failed to proceed data."
        })
    }

    return res.status(200).send({
        message: "Successfully proceed data."
    });
}
