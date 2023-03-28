const jwt = require("jsonwebtoken");

exports.checkCurrentUser = (req, res, next) => {
  const auth = req.header("Authorization");

  if (!auth) {
    req.user = null;
    next();
  } else {
    const token = auth.replace("Bearer ", "");

    try {
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

      req.user = verifyToken.userId;

      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
};
