//external import
const { Schema, model } = require("mongoose");

const homeEtcSchema = Schema(
  {
    homeTitle: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    homeSubtitle: {
      type: String,
      maxLength: 300,
      trim: true,
    },
    homeTotalProject: {
      type: String,
      trim: true,
    },
    homeTotalClient: {
      type: String,
      trim: true,
    },
    homeVedioTitle: {
      type: String,
      trim: true,
    },

    homeVedioDesctiption: {
      type: String,
      trim: true,
    },
    homeVedioUrl: {
      type: String,
      trim: true,
    },
    chartDescription: {
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

const HomeEtc = new model("HomeEtc", homeEtcSchema);

module.exports = HomeEtc;
