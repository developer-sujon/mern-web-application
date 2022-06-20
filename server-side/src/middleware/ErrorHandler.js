//External Lib Import
const createError = require("http-errors");

// 404 not found handler
exports.notFoundErrorHandler = (req, res, next) => {
  next(createError(404, "Your requested content was not found!"));
};

// Default Error Handler
exports.defaultErrorHandler = (err, req, res, next) => {
  if (err.message) {
    res.status(500).send({ status: "fail", data: err.message });
  } else {
    res
      .status(500)
      .send({ status: "fail", data: "There was an server side error!" });
  }
};
