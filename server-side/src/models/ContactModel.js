//external import
const { Schema, model } = require("mongoose");

const contactSchema = Schema(
  {
    contactName: {
      type: String,
      required: true,
      trim: true,
    },
    contactEmail: {
      type: String,
      required: true,
      trim: true,
    },
    contactMessage: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  { versionKey: false, timestamps: true },
);

const Contact = new model("Contact", contactSchema);

module.exports = Contact;
