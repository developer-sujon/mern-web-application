//internal import
const Information = require("../models/InpormationModel");

//Create new chart
exports.CreateInformation = (req, res) => {
  const {
    informationAboutDescription,
    informationTermsDescription,
    informationPrivacyDescription,
    informationRefundDescription,
  } = req.body;

  const newInformation = {
    informationAboutDescription,
    informationTermsDescription,
    informationPrivacyDescription,
    informationRefundDescription,
    user: req.id,
  };

  Information.create(newInformation, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      return res.status(201).json({ status: "success", data: data });
    }
  });
};

//Select all Informations
exports.SelectAllInformation = (req, res) => {
  const projection = "-createdAt -updatedAt";

  Information.find({}, projection)
    .populate("user", "name userName _id")
    .exec()
    .then((data) => {
      if (data && data.length > 0) {
        return res.json({ status: "success", data: data });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Information not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    });
};

//Select a Information by id
exports.SelectSingleInformation = (req, res) => {
  const { InformationId } = req.params;
  const projection = "-_id -createdAt -updatedAt";

  Information.find({ _id: InformationId }, projection)
    .populate("user", "name userName _id")
    .exec()
    .then((data) => {
      if (data && data.length > 0) {
        return res.json({ status: "success", data: data });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Information not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    });
};

//Update a Information
exports.UpdatedInformation = (req, res) => {
  const { InformationId } = req.params;
  const {
    informationAboutDescription,
    informationTermsDescription,
    informationPrivacyDescription,
    informationRefundDescription,
  } = req.body;

  const newInformation = {
    informationAboutDescription,
    informationTermsDescription,
    informationPrivacyDescription,
    informationRefundDescription,
  };

  Information.findByIdAndUpdate(
    { _id: InformationId },
    newInformation,
    { new: true },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ status: "fail", data: err.message });
      } else {
        if (data) {
          return res.json({
            status: "success",
            data: "Information Update Successfull",
          });
        } else {
          return res
            .status(404)
            .json({ status: "fail", data: "Information not found" });
        }
      }
    },
  );
};

//Delete  a Information
exports.DeleteInformation = (req, res) => {
  const { InformationId } = req.params;

  Information.findByIdAndDelete({ _id: InformationId }, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      if (data) {
        return res.json({
          status: "success",
          data: "Information Delete Successfull",
        });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Information not found" });
      }
    }
  });
};
