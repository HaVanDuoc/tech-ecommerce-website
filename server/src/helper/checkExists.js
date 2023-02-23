const db = require("../models");

exports.CheckUserNameExists = async (userName) => {
  const fetch = async;
  const { count, data } = await db.User.findAndCountAll({
    where: { userName },
    attributes: ["id", "userName"],
    raw: true,
  });

  console.log("data", data);

};
