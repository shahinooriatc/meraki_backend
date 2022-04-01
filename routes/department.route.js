'use strict';

const express = require('express');
const router = express.Router();
const multer  = require('multer')().none();

const department = require('../controllers/department.controller');

module.exports = (app) => {
    router.get("/", department.fetchAllDepartments);
    router.post("/", multer, department.createDepartment);
    router.get("/:id", department.fetchDepartmentById);
    router.patch("/:id", multer, department.updateDepartment);
    router.delete("/:id", department.deleteDepartment);

    app.use("/api/department", router);
};
