//external import
const { Schema, model } = require("mongoose");

const testmonialSchema = Schema(
  {
    testmonialName: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    testmonialDescription: {
      type: String,
      maxLength: 300,
      trim: true,
    },
    testmonialThumbnail: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  { versionKey: false, timestamps: true },
);

const Testmonial = new model("Testmonial", testmonialSchema);

module.exports = Testmonial;
