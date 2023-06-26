const { intervalServerError, badRequest } = require("../middleware/handleError")
const {
    getUsers,
    createUser,
    getUser,
    getStatus,
    updateUser,
    deleteUser,
    getRoles,
    getGender,
    searchUser,
    updateAvatar,
} = require("../services/userService")
const { createUser: joiCreateUser, updateUser: joiUpdateUser } = require("../helper/joiSchema")
const Joi = require("joi")

exports.getUsers = async (req, res) => {
    try {
        const response = await getUsers(req)

        return res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.getUser = async (req, res) => {
    try {
        const response = await getUser(req)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.createUser = async (req, res) => {
    try {
        const { error } = Joi.object({
            firstName: joiCreateUser.firstName,
            middleName: joiCreateUser.middleName,
            lastName: joiCreateUser.lastName,
            email: joiCreateUser.email,
            password: joiCreateUser.password,
            phoneNumber: joiCreateUser.phoneNumber,
            address: joiCreateUser.address,
            gender: joiCreateUser.gender,
            role: joiCreateUser.role,
            birthday: joiCreateUser.birthday,
        }).validate(req.body)

        if (error) return badRequest(error.details[0]?.message, res)

        const response = await createUser(req.body) // service

        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.getStatus = async (req, res) => {
    try {
        const response = await getStatus()
        return res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.getRoles = async (req, res) => {
    try {
        const response = await getRoles()
        return res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.getGender = async (req, res) => {
    try {
        const response = await getGender()
        return res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.updateUser = async (req, res) => {
    try {
        // const { error } = Joi.object({
        //     firstName: joiUpdateUser.firstName,
        //     middleName: joiUpdateUser.middleName,
        //     lastName: joiUpdateUser.lastName,
        //     userName: joiUpdateUser.userName,
        //     email: joiUpdateUser.email,
        //     password: joiUpdateUser.password,
        //     phoneNumber: joiUpdateUser.phoneNumber,
        //     address: joiUpdateUser.address,
        //     dateOfBirth: joiUpdateUser.dateOfBirth,
        //     avatar: joiUpdateUser.avatar,
        //     genderCode: joiUpdateUser.genderCode,
        //     roleId: joiUpdateUser.roleId,
        //     statusId: joiUpdateUser.statusId,
        //     userId,
        // }).validate(req.body)

        // if (error) return badRequest(error.details[0]?.message, res)

        // Check Email Exists
        if (req.body.email) {
            const checkEmail = await CheckEmailExists(req.body.email)
            if (checkEmail.err === 1) return res.status(200).json(checkEmail)
        }

        // Check Username Exists
        if (req.body.userName) {
            const checkUserName = await CheckUserNameExists(req.body.userName)
            if (checkUserName.err === 1) return res.status(200).json(checkUserName)
        }

        const userId = req.params.userId

        const response = await updateUser(userId, req.body)

        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.updateAvatar = async (req, res) => {
    try {
        const response = await updateAvatar(req)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId

        const response = await deleteUser(userId)

        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.searchUser = async (req, res) => {
    try {
        const response = await searchUser(req)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}
