//external import
const { Schema, model } = require("mongoose");

const informationSchema = Schema(
  {
    informationAboutDescription: {
      type: String,
      trim: true,
    },
    informationTermsDescription: {
      type: String,
      trim: true,
    },
    informationPrivacyDescription: {
      type: String,
      trim: true,
    },
    informationRefundDescription: {
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

const Information = new model("Information", informationSchema);

module.exports = Information;
