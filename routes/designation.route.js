'use strict';

const express = require('express');
const router = express.Router();
const multer  = require('multer')().none();

const designation = require('../controllers/designation.controller');

module.exports = (app) => {
    router.get("/", designation.fetchAllDesignations);
    router.post("/", multer, designation.createDesignation);
    router.get("/:id", designation.fetchDesignationById);
    router.patch("/:id", multer, designation.updateDesignation);
    router.delete("/:id", designation.deleteDesignation);

    app.use("/api/designation", router);
};
