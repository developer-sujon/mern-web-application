//external import
const mongoose = require("mongoose");

const chartSchema = mongoose.Schema(
  {
    chartXData: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    chartYData: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
    },
  },
  { versionKey: false, timestamps: true },
);

const Chart = new mongoose.model("Chart", chartSchema);

module.exports = Chart;
