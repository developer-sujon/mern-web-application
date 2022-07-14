//internal import
const Contact = require("../models/ContactModel");
const Chart = require("../models/ChartModel");
const Course = require("../models/CourseModel");
const Protfolio = require("../models/PortfolioModel");
const Service = require("../models/ServiceModel");
const Testmonial = require("../models/TestmonialModel");

//DashboardControllers
exports.DashboardControllers = (req, res) => {
  const DashboardSummary = {};

  Contact.aggregate([{ $count: "total" }], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      DashboardSummary.contact = data[0].total;
      return res.json(DashboardSummary);
    }
  });
};
