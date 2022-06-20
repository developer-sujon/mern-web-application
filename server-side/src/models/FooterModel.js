//external import
const { Schema, model } = require("mongoose");

const footerSchema = Schema(
  {
    footerAddress: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    footerEmail: {
      type: String,
      maxLength: 300,
      trim: true,
    },
    footerPhone: {
      type: String,
      maxLength: 300,
      trim: true,
    },
    footerFacebook: {
      type: String,
      maxLength: 300,
      trim: true,
    },
    footerGithub: {
      type: String,
      maxLength: 300,
      trim: true,
    },
    footerCredit: {
      type: String,
      maxLength: 300,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  { versionKey: false, timestamps: true },
);

const Footer = new model("Footer", footerSchema);

module.exports = Footer;
