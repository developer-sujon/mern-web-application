//internal import
const Footer = require("../models/FooterModel");

//Create new chart
exports.CreateFooter = (req, res) => {
  const {
    footerAddress,
    footerEmail,
    footerPhone,
    footerFacebook,
    footerGithub,
    footerCredit,
  } = req.body;

  const newFooter = {
    footerAddress,
    footerEmail,
    footerPhone,
    footerFacebook,
    footerGithub,
    footerCredit,
    user: req.id,
  };

  Footer.create(newFooter, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      return res.status(201).json({ status: "success", data: data });
    }
  });
};

//Select all Footers
exports.SelectAllFooter = (req, res) => {
  const projection = "-createdAt -updatedAt";

  Footer.find({}, projection)
    .populate("user", "name userName _id")
    .exec()
    .then((data) => {
      if (data && data.length > 0) {
        return res.json({ status: "success", data: data });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Footer not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    });
};

//Select a Footer by id
exports.SelectSingleFooter = (req, res) => {
  const { FooterId } = req.params;
  const projection = "-createdAt -updatedAt";

  Footer.find({ _id: FooterId }, projection)
    .populate("user", "name userName _id")
    .exec()
    .then((data) => {
      if (data && data.length > 0) {
        return res.json({ status: "success", data: data });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Chart not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    });
};

//Update a Footer
exports.UpdatedFooter = (req, res) => {
  const { FooterId } = req.params;
  const {
    footerAddress,
    footerEmail,
    footerPhone,
    footerFacebook,
    footerGithub,
    footerCredit,
  } = req.body;

  const newFooter = {
    footerAddress,
    footerEmail,
    footerPhone,
    footerFacebook,
    footerGithub,
    footerCredit,
  };

  Footer.findByIdAndUpdate(
    { _id: FooterId },
    newFooter,
    { new: true },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ status: "fail", data: err.message });
      } else {
        if (data) {
          return res.json({
            status: "success",
            data: "Footer Update Successfull",
          });
        } else {
          return res
            .status(404)
            .json({ status: "fail", data: "Portfolio not found" });
        }
      }
    },
  );
};

//Delete  a Footer
exports.DeleteFooter = (req, res) => {
  const { FooterId } = req.params;

  Footer.findByIdAndDelete({ _id: FooterId }, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      if (data) {
        return res.json({
          status: "success",
          data: "Footer Delete Successfull",
        });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Course not found" });
      }
    }
  });
};
