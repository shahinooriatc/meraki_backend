'use strict';

const mongoose = require("mongoose");

const ExpensesSchema = new mongoose.Schema({
    name: String,
    description: String,
    amount: Number,
    from: String,
    date: Date,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        default: "pending"
    },
    deletedAt: Date
}, { timestamps: true })

const Expenses = mongoose.model("Expenses", ExpensesSchema)

module.exports = Expenses;