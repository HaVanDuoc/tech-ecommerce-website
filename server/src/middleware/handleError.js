const createError = require("http-errors")

// Error - Not Found
exports.notFound = (req, res, err) => {
    const error = createError.NotFound("Trang hiện tại không khả dụng!")

    return res.status(error.status).json({
        err: 1,
        msg: error.message,
    })
}

// Error - Interval Server Error
exports.intervalServerError = (res) => {
    const error = createError.InternalServerError("Lỗi máy chủ!")

    return res.status(error.status).json({
        err: 1,
        msg: error.message,
    })
}

// Error - Bad Request
exports.badRequest = (err, res) => {
    const error = createError.BadRequest(err)

    return res.status(error.status).json({
        err: 1,
        msg: error.message,
    })
}

// Error - Unauthorized
exports.unauthorized = (err, res) => {
    const error = createError.Unauthorized(err)

    return res.status(200).json({
        err: 1,
        msg: error.message,
    })
}
