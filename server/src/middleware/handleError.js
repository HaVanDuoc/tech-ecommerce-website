const createError = require("http-errors");

// Error - Not Found
const notFound = (req, res, err) => {
  const error = createError.NotFound("Trang hiện tại không khả dụng!");

  return res.status(error.status).json({
    err: 1,
    msg: error.message,
  });
};

// Error - Interval Server Error
const intervalServerError = (res) => {
  const error = createError.InternalServerError("Lỗi máy chủ!");

  return res.status(error.status).json({
    err: 1,
    msg: error.message,
  });
};

// Error - Bad Request
const badRequest = (res, err) => {
  const error = createError.BadRequest(err);

  return res.status(error.status).json({
    err: 1,
    msg: error.message,
  });
};

module.exports = { notFound, intervalServerError, badRequest };
