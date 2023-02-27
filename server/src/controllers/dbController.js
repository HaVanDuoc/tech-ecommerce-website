const { intervalServerError } = require("../middleware/handleError");

const dbService = require("../services/dbService");

exports.ListTables = async (req, res) => {
  try {
    const response = await dbService.ListTables();

    return res.status(200).json(response);
    //
  } catch (error) {
    return intervalServerError(res);
  }
};

exports.getGender = async (req, res) => {
  try {
    const response = await dbService.getGender();

    return res.status(200).json(response);
    //
  } catch (error) {
    return intervalServerError(res);
  }
};

exports.listRole = async (req, res) => {
  try {
    const response = await dbService.listRole();

    return res.status(200).json(response);
    //
  } catch (error) {
    return intervalServerError(res);
  }
};

// Status Account
exports.statusAccount = async (req, res) => {
  try {
    const response = await dbService.statusAccount();

    return res.status(200).json(response);
    //
  } catch (error) {
    return intervalServerError(res);
  }
};

// List Category
exports.listCategory = async (req, res) => {
  try {
    const response = await dbService.listCategory();

    return res.status(200).json(response);
    //
  } catch (error) {
    return intervalServerError(res);
  }
};
