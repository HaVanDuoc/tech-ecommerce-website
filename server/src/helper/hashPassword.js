const bcrypt = require("bcryptjs");

exports.hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
