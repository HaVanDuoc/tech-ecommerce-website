const db = require("../../../models");

exports.findCustomer = (key) =>
  new Promise(async (resolve, reject) => {
    try {
      const [find] = await db.sequelize.query(`
        select
            *
        from
            (
                select
                    users.id as 'user_id',
                    users.avatar,
                    users.firstName,
                    users.middleName,
                    users.lastName,
                    rtrim(
                        ltrim(
                            CONCAT(
                                IFNULL(users.firstName, ''),
                                ' ',
                                IFNULL(users.middleName, ''),
                                ' ',
                                users.lastName
                            )
                        )
                    ) as fullName,
                    users.phoneNumber,
                    users.address,
                    users.dateOfBirth,
                    genders.name as 'gender'
                from
                    users
                    left join genders on genders.code = users.genderCode
            ) as u
        where
            u.phoneNumber like N'%${key || ""}%'
            or u.fullName like N'%${key || ""}%';
    `);

      resolve({
        err: find ? 0 : 1,
        msg: find ? "Get data successfully" : "Get data failure",
        data: find ? find : [],
      });
    } catch (error) {
      reject(error);
    }
  });
