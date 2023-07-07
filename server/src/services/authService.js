// authService.js

const db = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { padUserId } = require("../helper/padLeft")
const { hashPassword } = require("../helper/hashPassword")
const generateSequenceRandomInteger = require("../helper/generateSequenceRandomInteger")
const mailer = require("../utils/mailer")
const mailVerifyCode = require("../helper/mail/mailVerifyCode")

exports.getCurrentUser = async (user_id) => {
    try {
        const query = `select
                          users.id,
                          users.userId,
                          users.firstName,
                          users.middleName,
                          users.lastName,
                          users.userName,
                          users.email,
                          genders.name as 'gender',
                          users.avatar,
                          users.phoneNumber,
                          users.address,
                          users.dateOfBirth,
                          roles.name as 'role',
                          cart_sessions.id as 'cart_sessions_id'
                      from
                          users
                          left join genders on genders.code = users.genderCode
                          left join roles on roles.roleId = users.roleId
                          left join cart_sessions on cart_sessions.user_id = users.id
                      where
                          users.id = '${user_id}'
                      limit
                          1;`

        const [response] = await db.sequelize.query(query, { raw: true })

        const getSumPayment = async () => {
            const [sum] = await db.sequelize.query(
                `select sum(total) as sum from order_details where user_id = ${user_id}`
            )

            return sum[0].sum
        }

        response[0]["sumPayment"] = await getSumPayment()

        return {
            err: response ? 0 : 1,
            msg: response ? "Get successfully" : "Get failure",
            data: response ? response[0] : null,
        }
    } catch (error) {
        return error
    }
}

exports.register = async (data) => {
    try {
        const firstName = data.firstName
        const middleName = data.middleName
        const lastName = data.lastName
        const email = data.email
        const password = data.password

        // Create User Id
        const query = `select userId from users order by id desc limit 1;`
        const [lastId] = await db.sequelize.query(query, { raw: true }) // Get uid of user final e.g 'U00000006'
        const sliceId = lastId.length ? lastId[0].userId.slice(-8) : 0 // get 8 char final to result e.g '00000006'
        const userId = padUserId(parseInt(sliceId) + 1) // parseInt is convert 00000006 to 6

        const roleId = "R001" // Role default is "R001" - "khách hàng"

        // kết quả trả về một array [data: object, created: boolean]
        const response = await db.users.findOrCreate({
            where: { email }, // tìm thấy email created=false -> Tài khoản đã tồn tại
            // Ko tìm thấy dữ liệu -> created=true -> tạo dữ liệu mới theo defaults -> Đăng ký thành công
            defaults: {
                userId,
                firstName,
                middleName,
                lastName,
                email,
                password: hashPassword(password),
                roleId,
            },
            raw: true, // chuyển instants thành object json
        })

        // if create new user then it will be executed
        if (response[1]) {
            // Đồng thời khởi tạo 1 giỏ hàng trong model `cart_session` bên cart dùng tới
            // First, find id from userId
            const [user_id] = await db.sequelize.query(`select id from users where userId = '${userId}'`)
            // second, add this id in the table cart_sessions
            const cart = await db.cart_sessions.findOrCreate({
                where: { user_id: user_id[0].id },
                defaults: {
                    user_id: user_id[0].id,
                },
                raw: true,
            })
        }

        // Nếu đăng ký thành công xem như đã đăng nhập nên tạo token luôn
        // jwt.sign(payload, secretOrPrivateKey, [options, callback])
        const token = response[1]
            ? jwt.sign(
                  {
                      id: response[0].id,
                      userId: response[0].userId,
                      firstName: response[0].firstName,
                      middleName: response[0].middleName,
                      lastName: response[0].lastName,
                      email: response[0].email,
                  },
                  process.env.JWT_SECRET,
                  {
                      expiresIn: "7d", // phiên đăng nhập
                  }
              )
            : null

        return {
            err: response[1] ? 0 : 1,
            msg: response[1] ? "Đăng ký thành công" : "Email đã được sử dụng!",
            access_token: token ? `Bearer ${token}` : null,
        }
    } catch (error) {
        return error
    }
}

exports.login = async (data) => {
    try {
        const { email, password } = data

        const response = await db.users.findOne({
            where: { email },
            raw: true, // chuyển instants thành object json
        })

        // Check password
        const isCheckedPassword = response && bcrypt.compareSync(password, response.password)

        const token = isCheckedPassword
            ? jwt.sign(
                  {
                      id: response.id,
                      userId: response.userId,
                      email: response.email,
                      firstName: response.firstName,
                      middleName: response.middleName,
                      lastName: response.lastName,
                      roleId: response.roleId,
                  },
                  process.env.JWT_SECRET,
                  {
                      expiresIn: "7d", // phiên đăng nhập
                  }
              )
            : null

        return {
            err: token ? 0 : 1,
            msg: token ? "Đăng nhập thành công" : response ? "Sai mật khẩu" : "Email chưa được đăng ký",
            access_token: token ? `Bearer ${token}` : null,
        }
    } catch (error) {
        return error
    }
}

exports.getCode = async (req) => {
    try {
        const email = req.body.email
        const code = generateSequenceRandomInteger(6)
        const hashCode = jwt.sign({ code }, process.env.JWT_SECRET, { expiresIn: "10m" })

        const updateCode = await db.users.update(
            { code_verify: hashCode },
            {
                where: { email },
                raw: true,
            }
        )

        if (updateCode) {
            mailer.sendMail(email, `${code} là mã khôi phục tài khoản Tech của bạn`, mailVerifyCode({ code }))
        }

        return {
            err: updateCode ? 0 : 1,
            msg: updateCode ? "Successfully" : "Failure",
            email: email,
        }
    } catch (error) {
        return error
    }
}

exports.changePassword = async (req) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const hashPass = hashPassword(password)

        const updatePassword = await db.users.update(
            {
                password: hashPass,
            },
            { where: { email } }
        )

        return {
            err: updatePassword ? 0 : 1,
            msg: updatePassword ? "Thành công!" : "Lỗi!",
        }
    } catch (error) {
        return error
    }
}

exports.verifyCode = async (req) => {
    try {
        const email = req.body.email
        const code = req.body.code

        const getCode = await db.users.findOne({ where: { email }, attributes: ["code_verify"], raw: true })
        const decoded = jwt.verify(getCode.code_verify, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return err
            return decoded
        })
        if (decoded.name === "TokenExpiredError") return { err: 1, msg: "Mã xác nhận đã quá hạn!" }

        if (Number(code) !== Number(decoded.code)) return { err: 1, msg: "Mã xác nhận không chính xác!" }

        return {
            err: 0,
            msg: "Verify successfully",
        }
    } catch (error) {
        return error
    }
}
