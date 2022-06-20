//internal import
const HomeEtc = require("../models/HomeEtcModel");

//Create new chart
exports.CreateHomeEtc = (req, res) => {
  const {
    homeTitle,
    homeSubtitle,
    homeTotalProject,
    homeTotalClient,
    homeVedioTitle,
    homeVedioDesctiption,
    homeVedioUrl,
    chartDescription,
  } = req.body;

  const newHomeEtc = {
    homeTitle,
    homeSubtitle,
    homeTotalProject,
    homeTotalClient,
    homeVedioTitle,
    homeVedioDesctiption,
    homeVedioUrl,
    chartDescription,
    user: req.id,
  };

  HomeEtc.create(newHomeEtc, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      return res.status(201).json({ status: "success", data: data });
    }
  });
};

//Select all HomeEtcs
exports.SelectAllHomeEtc = (req, res) => {
  const projection = "-createdAt -updatedAt";

  HomeEtc.find({}, projection)
    .populate("user", "name userName _id")
    .exec()
    .then((data) => {
      if (data && data.length > 0) {
        return res.json({ status: "success", data: data });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "HomeEtc not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    });
};

//Select a HomeEtc by id
exports.SelectSingleHomeEtc = (req, res) => {
  const { HomeEtcId } = req.params;
  const projection = "-_id -createdAt -updatedAt";

  HomeEtc.find({ _id: HomeEtcId }, projection)
    .populate("user", "name userName _id")
    .exec()
    .then((data) => {
      if (data && data.length > 0) {
        return res.json({ status: "success", data: data });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "HomeEtc not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    });
};

//Update a HomeEtc
exports.UpdatedHomeEtc = (req, res) => {
  const { HomeEtcId } = req.params;
  const {
    homeTitle,
    HomeEtcTermsDescription,
    HomeEtcPrivacyDescription,
    HomeEtcRefundDescription,
    chartDescription,
    homeTotalProject,
    homeTotalClient,
  } = req.body;

  const newHomeEtc = {
    homeTitle,
    HomeEtcTermsDescription,
    HomeEtcPrivacyDescription,
    HomeEtcRefundDescription,
    chartDescription,
    homeTotalProject,
    homeTotalClient,
  };

  HomeEtc.findByIdAndUpdate(
    { _id: HomeEtcId },
    newHomeEtc,
    { new: true },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ status: "fail", data: err.message });
      } else {
        if (data) {
          return res.json({
            status: "success",
            data: "HomeEtc Update Successfull",
          });
        } else {
          return res
            .status(404)
            .json({ status: "fail", data: "HomeEtc not found" });
        }
      }
    },
  );
};

//Delete  a HomeEtc
exports.DeleteHomeEtc = (req, res) => {
  const { HomeEtcId } = req.params;

  HomeEtc.findByIdAndDelete({ _id: HomeEtcId }, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      if (data) {
        return res.json({
          status: "success",
          data: "HomeEtc Delete Successfull",
        });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "HomeEtc not found" });
      }
    }
  });
};
