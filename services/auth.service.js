'use strict';

const { db } = require("../models")
const User = db.user;

exports.login = async (data) => await User.findOne({ email: data.email })
