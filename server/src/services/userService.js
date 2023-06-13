const db = require("../models")
const { getOffset } = require("../utils/calculator")
const { padUserId } = require("../helper/padLeft")
const { hashPassword } = require("../helper/hashPassword")

exports.getUsers = async (req) => {
    try {
        const page = req.body.page || 1
        const limit = 9
        const offset = getOffset(page, limit) || 0

        const query = `select
                            users.id,
                            userId,
                            firstName,
                            middleName,
                            lastName,
                            email,
                            avatar,
                            statuses.name as 'status',
                            tbl_SumPayment.sumPayment
                        from
                            users
                            left join statuses on statuses.statusId = users.statusId
                            left join roles on roles.roleId = users.roleId
                            left join (
                                select
                                    order_details.user_id,
                                    sum(total) as sumPayment
                                from
                                    order_details
                                group by
                                    user_id
                            ) tbl_SumPayment on tbl_SumPayment.user_id = users.id
                        order by
                            users.createdAt desc
                        limit
                            ${limit} 
                        offset 
                            ${offset};`

        const [fetch] = await db.sequelize.query(query)

        const [counter] = await db.sequelize.query(`select count(*) as countUser from users;`)

        let response = new Object()

        const countUser = counter[0].countUser

        response["limit"] = limit
        response["sumProducts"] = countUser
        response["currentPage"] = page
        response["sumPages"] = Math.ceil(countUser / limit)
        response["list"] = fetch

        return {
            err: response ? 0 : 1,
            msg: response ? "Successfully" : "Failure",
            data: response,
        }
    } catch (error) {
        return error
    }
}

exports.getUser = async (req) => {
    try {
        const userId = req.params.userId

        const query = `SELECT
                        users.id,
                        userId,
                        firstName,
                        middleName,
                        lastName,
                        userName,
                        email,
                        password,
                        avatar,
                        dateOfBirth,
                        phoneNumber,
                        address,
                        transactionVolume,
                        genders.name as 'gender',
                        statuses.name as 'status',
                        roles.name as "role"
                    FROM
                        users
                        left join statuses on users.statusId = statuses.statusId
                        left join roles on users.roleId = roles.roleId
                        left join genders on users.genderCode = genders.code
                    WhERE
                        userId = "${userId}"
                    LIMIT
                        1;`

        const [response] = await db.sequelize.query(query, { raw: true })

        return {
            err: response ? 0 : 1,
            msg: response ? "Get data successfully" : "Get data failed",
            data: response[0],
        }
    } catch (error) {
        return error
    }
}

exports.createUser = async (data) => {
    try {
        const { firstName, middleName, lastName, email, password, phoneNumber, address, gender, role, birthday } = data

        // Create User Id
        const query = `select userId from users order by id desc limit 1;`
        const [idUserFinal] = await db.sequelize.query(query, { raw: true }) // Get uid of user final e.g 'U00000006'
        const sliceId = idUserFinal[0].userId.slice(-8) // get 8 char final to result e.g '00000006'
        const userId = padUserId(parseInt(sliceId) + 1) // parseInt is convert 00000006 to 6

        // kết quả trả về một array [data: object, created: boolean]
        const response = await db.User.findOrCreate({
            where: { email }, // tìm thấy email created=false -> Tài khoản đã tồn tại
            // Ko tìm thấy dữ liệu -> created=true -> tạo dữ liệu mới theo defaults -> Đăng ký thành công
            defaults: {
                userId,
                firstName,
                middleName,
                lastName,
                email,
                password: hashPassword(password),
                phoneNumber,
                address,
                dateOfBirth: birthday,
                genderCode: gender,
                roleId: role,
            },
            raw: true, // chuyển instants thành object json
        })

        return {
            err: response[1] ? 0 : 1,
            msg: response[1] ? "Tạo tài khoản thành công!" : "Email đã được đăng ký",
            data: response[1] ? response[0] : null,
        }
    } catch (error) {
        return error
    }
}

exports.getStatus = async () => {
    try {
        const response = await db.Status.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] } }, { raw: true })

        return {
            err: response ? 0 : 1,
            msg: response ? "Successfully" : "Failure",
            data: response,
        }
    } catch (error) {
        return error
    }
}

exports.getRoles = async () => {
    try {
        const response = await db.Role.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] } }, { raw: true })

        return {
            err: response ? 0 : 1,
            msg: response ? "Successfully" : "Failure",
            data: response,
        }
    } catch (error) {
        return error
    }
}

exports.getGender = async () => {
    try {
        const response = await db.Gender.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] } }, { raw: true })

        return {
            err: response ? 0 : 1,
            msg: response ? "Successfully" : "Failure",
            data: response,
        }
    } catch (error) {
        return error
    }
}

exports.updateUser = async (userId, data) => {
    try {
        if (data.password) data.password = hashPassword(data.password)

        response = await db.User.update(data, {
            where: { userId },
            raw: true,
        })

        return {
            err: response ? 0 : 1,
            msg: response ? "Cập nhật thành công" : "Cập nhật thất bại",
            data: response[0],
        }
    } catch (error) {
        return error
    }
}

exports.deleteUser = async (userId) => {
    try {
        const response = await db.User.destroy({
            where: { userId },
            raw: true,
        })

        return {
            err: response ? 0 : 1,
            msg: response ? "Đã xóa" : "Xóa thất bại",
        }
    } catch (error) {
        return error
    }
}
