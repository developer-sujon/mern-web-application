//external import
const { Schema, model } = require("mongoose");

const portfolioSchema = Schema(
  {
    portfolioName: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    portfolioDescription: {
      type: String,
      maxLength: 300,
      trim: true,
    },
    portfolioThumbnail: {
      type: String,
    },
    portfolioCover: {
      type: String,
    },
    portfolioUrl: {
      type: String,
      trim: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  { versionKey: false, timestamps: true },
);

const Portfolio = new model("Portfolio", portfolioSchema);

module.exports = Portfolio;
