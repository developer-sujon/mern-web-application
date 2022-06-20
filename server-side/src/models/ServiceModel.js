//external import
const { Schema, model } = require("mongoose");

const serviceSchema = Schema(
  {
    serviceName: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    serviceDescription: {
      type: String,
      maxLength: 300,
      trim: true,
    },
    serviceThumbnail: {
      type: String,
    },
    serviceCover: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  { versionKey: false, timestamps: true },
);

const Service = new model("Service", serviceSchema);

module.exports = Service;
