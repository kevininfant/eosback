const User = require("../models/User");
const validator = require("validator");
const { isEmail, isMobilePhone } = validator;
const { to, TE } = require("../services/util.service");
const CONFIG = require("../config/config");

module.exports.generateCode = async (email) => {
  if (!isEmail(email)) {
    TE("Invalid Email id. Cannot generate code");
  }

  let code = await Math.floor(100000 + Math.random() * 900000);
  return code;
};
