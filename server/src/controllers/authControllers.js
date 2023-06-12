const { intervalServerError, badRequest } = require("../middleware/handleError")
const authService = require("../services/authService")
const Joi = require("joi")

exports.getCurrentUser = async (req, res) => {
    try {
        // req.user contain userId of current user
        // if req.user === null response require login
        if (req.user === null) {
            return res.status(200).json({
                err: 1,
                msg: "Yêu cầu đăng nhập",
                data: null,
            })
        }

        const user_id = req.user.user_id

        const response = await authService.getCurrentUser(user_id)

        return res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.register = async (req, res) => {
    try {
        const { error } = Joi.object({
            firstName: Joi.string().min(1).required(),
            middleName: Joi.string().min(1).required(),
            lastName: Joi.string().min(1).required(),
            email: Joi.string()
                .min(1)
                .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
                .required(),
            password: Joi.string().min(5).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
        }).validate(req.body)

        if (error) return badRequest(error.details[0]?.message, res)

        const response = await authService.register(req.body)

        return res.status(200).json(response)
        //
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.login = async (req, res) => {
    try {
        const { error } = Joi.object({
            email: Joi.string()
                .min(3)
                .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
                .required(),
            password: Joi.string().min(6).required(),
        }).validate(req.body)

        if (error) return badRequest(error.details[0]?.message, res)

        const response = await authService.login(req.body)

        return res.status(200).json(response)
        //
    } catch (error) {
        return intervalServerError(res)
    }
}
