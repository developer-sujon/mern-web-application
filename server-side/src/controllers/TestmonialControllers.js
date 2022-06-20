//internal import
const Testmonial = require("../models/TestmonialModel");

//Create new chart
exports.CreateTestmonial = (req, res) => {
  const {
    testmonialName,
    testmonialDescription,
    TestmonialThumbnail,
    testmonialThumbnail,
  } = req.body;

  const newTestmonial = {
    testmonialName,
    testmonialDescription,
    testmonialThumbnail,
    user: req.id,
  };

  Testmonial.create(newTestmonial, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      return res.status(201).json({ status: "success", data: data });
    }
  });
};

//Select all Testmonials
exports.SelectAllTestmonial = (req, res) => {
  const projection = "-createdAt -updatedAt";

  Testmonial.find({}, projection)
    .populate("user", "name userName _id")
    .exec()
    .then((data) => {
      if (data && data.length > 0) {
        return res.json({ status: "success", data: data });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Testmonial not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    });
};

//Select a Testmonial by id
exports.SelectSingleTestmonial = (req, res) => {
  const { TestmonialId } = req.params;
  const projection = "-_id -createdAt -updatedAt";

  Testmonial.find({ _id: TestmonialId }, projection)
    .populate("user", "name userName _id")
    .exec()
    .then((data) => {
      if (data && data.length > 0) {
        return res.json({ status: "success", data: data });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Testmonial not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    });
};

//Update a Testmonial
exports.UpdatedTestmonial = (req, res) => {
  const { TestmonialId } = req.params;
  const {
    testmonialName,
    testmonialDescription,
    TestmonialThumbnail,
    testmonialThumbnail,
  } = req.body;

  const newTestmonial = {
    testmonialName,
    testmonialDescription,
    testmonialThumbnail,
    user: req.id,
  };

  Testmonial.findByIdAndUpdate(
    { _id: TestmonialId },
    newTestmonial,
    { new: true },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ status: "fail", data: err.message });
      } else {
        if (data) {
          return res.json({
            status: "success",
            data: "Testmonial Update Successfull",
          });
        } else {
          return res
            .status(404)
            .json({ status: "fail", data: "Testmonial not found" });
        }
      }
    },
  );
};

//Delete  a Testmonial
exports.DeleteTestmonial = (req, res) => {
  const { TestmonialId } = req.params;

  Testmonial.findByIdAndDelete({ _id: TestmonialId }, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      if (data) {
        return res.json({
          status: "success",
          data: "Testmonial Delete Successfull",
        });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Chart not found" });
      }
    }
  });
};
