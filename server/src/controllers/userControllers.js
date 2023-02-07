const { intervalServerError } = require("../middleware/handleError");
const services = require("../services");

const getCurrent = async (req, res) => {
  try {
    const { id } = req.user;

    const response = await services.getOne;
  } catch (error) {
    return intervalServerError(res);
  }
};

export { getCurrent };
