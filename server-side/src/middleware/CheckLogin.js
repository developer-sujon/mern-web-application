//external import
const jwt = require("jsonwebtoken");

exports.CheckLogin = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const secretKey = process.env.JWT_SECRET_KEY;

  jwt.verify(token, secretKey, (err, result) => {
    if (err) {
      res
        .status(401)
        .json({ status: "fail", data: "authorization Credential" });
    } else {
      req.id = result.id;
      req.userName = result.userName;
      next();
    }
  });
};
