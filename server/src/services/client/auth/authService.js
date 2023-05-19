// authService.js

const db = require("../../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { padUserId } = require("../../../helper/padLeft");
const { hashPassword } = require("../../../helper/hashPassword");

exports.getCurrentUser = (userId) =>
  new Promise(async (resolve, reject) => {
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
                          users.transactionVolume,
                          users.dateOfBirth,
                          roles.name as 'role',
                          cart_sessions.id as 'cart_sessions_id'
                      from
                          users
                          left join genders on genders.code = users.genderCode
                          left join roles on roles.roleId = users.roleId
                          left join cart_sessions on cart_sessions.user_id = users.id
                      where
                          users.userId = '${userId}'
                      limit
                          1;`;

      const [response] = await db.sequelize.query(query, { raw: true });

      // Get count products in the cart to display at button cart on app bar
      const checkCountProductInCart = async () => {
        const [count] = await db.sequelize.query(
          `select count(*) as 'count' from cart_items where cart_session_id = '${response[0].cart_sessions_id}'`
        );

        countProductInCart = count[0].count;
      };

      checkCountProductInCart();

      resolve({
        countProductInCart: countProductInCart ? countProductInCart : 0,
        err: response ? 0 : 1,
        msg: response ? "Get successfully" : "Get failure",
        data: response ? response[0] : null,
      });
    } catch (error) {
      reject(error);
    }
  });

// SERVICE REGISTER
exports.register = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const { firstName, middleName, lastName, email, password } = data;

      // Create User Id
      const query = `select userId from users order by id desc limit 1;`;
      const [lastId] = await db.sequelize.query(query, { raw: true }); // Get uid of user final e.g 'U00000006'
      const sliceId = lastId.length ? lastId[0].userId.slice(-8) : 0; // get 8 char final to result e.g '00000006'
      console.log("sliceId", sliceId);
      const userId = padUserId(parseInt(sliceId) + 1); // parseInt is convert 00000006 to 6

      const roleId = "R001"; // Role default is "R001" - "khách hàng"

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
          roleId,
        },
        raw: true, // chuyển instants thành object json
      });

      // if create new user then it will be executed
      if (response[1]) {
        // Đồng thời khởi tạo 1 giỏ hàng trong model `cart_session` bên cart dùng tới
        // First, find id from userId
        const [user_id] = await db.sequelize.query(
          `select id from users where userId = '${userId}'`
        );
        // second, add this id in the table cart_sessions
        const cart = await db.Cart_Session.findOrCreate({
          where: { user_id: user_id[0].id },
          defaults: {
            user_id: user_id[0].id,
          },
          raw: true,
        });
      }

      // Nếu đăng ký thành công xem như đã đăng nhập nên tạo token luôn
      // jwt.sign(payload, secretOrPrivateKey, [options, callback])
      const token = response[1]
        ? jwt.sign(
            {
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
        : null;

      resolve({
        err: response[1] ? 0 : 1,
        msg: response[1] ? "Đăng ký thành công" : "Email đã được sử dụng!",
        access_token: token ? `Bearer ${token}` : null,
      });
    } catch (error) {
      reject(error);
    }
  });

// SERVICE LOGIN
exports.login = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const { email, password } = data;

      const response = await db.User.findOne({
        where: { email },
        raw: true, // chuyển instants thành object json
      });

      // Check password
      const isCheckedPassword =
        response && bcrypt.compareSync(password, response.password);

      const token = isCheckedPassword
        ? jwt.sign(
            {
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
        : null;

      resolve({
        err: token ? 0 : 1,
        msg: token
          ? "Đăng nhập thành công"
          : response
          ? "Sai mật khẩu"
          : "Email chưa được đăng ký",
        access_token: token ? `Bearer ${token}` : null,
      });
    } catch (error) {
      reject(error);
    }
  });
