'use strict';

const express = require('express');
const router = express.Router();
const multer  = require('multer')().none();

const expenses = require('../controllers/expenses.controller');

module.exports = (app) => {
    router.get("/", expenses.fetchAllExpenses);
    router.post("/", multer, expenses.createExpenses);
    router.get("/:id", expenses.fetchExpensesById);
    router.patch("/:id", multer, expenses.updateExpenses);
    router.delete("/:id", expenses.deleteExpenses);

    app.use("/api/expenses", router);
};
