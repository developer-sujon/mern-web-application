//internal import
const Portfolio = require("../models/PortfolioModel");

//Create new chart
exports.CreatePortfolio = (req, res) => {
  const {
    portfolioName,
    portfolioDescription,
    portfolioThumbnail,
    portfolioCover,
    portfolioUrl,
  } = req.body;

  const newPortfolio = {
    portfolioName,
    portfolioDescription,
    portfolioThumbnail,
    portfolioCover,
    portfolioUrl,
    user: req.id,
  };

  Portfolio.create(newPortfolio, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      return res.status(201).json({ status: "success", data: data });
    }
  });
};

//Select all Portfolios
exports.SelectAllPortfolio = (req, res) => {
  const projection = "-createdAt -updatedAt";

  Portfolio.find({}, projection)
    .populate("user", "name userName _id")
    .exec()
    .then((data) => {
      if (data && data.length > 0) {
        return res.json({ status: "success", data: data });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Portfolio not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    });
};

//Select a Portfolio by id
exports.SelectSinglePortfolio = (req, res) => {
  const { PortfolioId } = req.params;
  const projection = "-_id -createdAt -updatedAt";

  Portfolio.find({ _id: PortfolioId }, projection)
    .populate("user", "name userName _id")
    .exec()
    .then((data) => {
      if (data && data.length > 0) {
        return res.json({ status: "success", data: data });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Portfolio not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    });
};

//Update a Portfolio
exports.UpdatedPortfolio = (req, res) => {
  const { PortfolioId } = req.params;
  const {
    portfolioName,
    portfolioDescription,
    portfolioThumbnail,
    portfolioCover,
    portfolioUrl,
  } = req.body;

  const newPortfolio = {
    portfolioName,
    portfolioDescription,
    portfolioThumbnail,
    portfolioCover,
    portfolioUrl,
  };

  Portfolio.findByIdAndUpdate(
    { _id: PortfolioId },
    newPortfolio,
    { new: true },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ status: "fail", data: err.message });
      } else {
        if (data) {
          return res.json({
            status: "success",
            data: "Portfolio Update Successfull",
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

//Delete  a Portfolio
exports.DeletePortfolio = (req, res) => {
  const { PortfolioId } = req.params;

  Portfolio.findByIdAndDelete({ _id: PortfolioId }, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      if (data) {
        return res.json({
          status: "success",
          data: "Portfolio Delete Successfull",
        });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Portfolio not found" });
      }
    }
  });
};
