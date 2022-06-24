//internal import
const Chart = require("../models/ChartModel");

//Create new chart
exports.CreateChart = (req, res) => {
  const { chartXData, chartYData } = req.body;
  const newChart = { chartXData, chartYData, user: req.id };

  Chart.create(newChart, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      return res
        .status(201)
        .json({ status: "success", data: "Chart Create Successfull" });
    }
  });
};

//Select all charts
exports.SelectAllChart = (req, res) => {
  const projection = " -createdAt -updatedAt";

  Chart.find({}, projection)
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

//Select a chart by id
exports.SelectSingleChart = (req, res) => {
  const { ChartId } = req.params;

  const projection = "-createdAt -updatedAt";

  Chart.find({ _id: ChartId }, projection)
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

//Update a chart
exports.UpdatedChart = (req, res) => {
  const { ChartId } = req.params;
  const { chartXData, chartYData } = req.body;
  const newChart = { chartXData, chartYData };

  Chart.findByIdAndUpdate(
    { _id: ChartId },
    newChart,
    { new: true },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ status: "fail", data: err.message });
      } else {
        if (data) {
          return res.json({
            status: "success",
            data: "Chart Update Successfull",
          });
        } else {
          return res
            .status(404)
            .json({ status: "fail", data: "Chart not found" });
        }
      }
    },
  );
};

//Delete  a chart
exports.DeleteChart = (req, res) => {
  const { ChartId } = req.params;

  Chart.findByIdAndDelete({ _id: ChartId }, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      if (data) {
        return res.json({
          status: "success",
          data: "Chart Delete Successfull",
        });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Chart not found" });
      }
    }
  });
};
