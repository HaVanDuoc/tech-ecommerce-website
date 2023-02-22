const { intervalServerError } = require("../middleware/handleError");

const dbService = require("../services/dbService");

exports.getGender = async (req, res) => {
  try {
    const response = await dbService.getGender();

    return res.status(200).json(response);
    //
  } catch (error) {
    return intervalServerError(res);
  }
};
