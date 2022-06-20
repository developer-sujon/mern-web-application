const { Schema, model } = require("mongoose");

const profileSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    birthday: {
      type: String,
      trim: true,
    },
    cv: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "disabled"],
      default: "inactive",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { versionKey: false, timestamps: true },
);

const Profile = model("Profile", profileSchema);

module.exports = Profile;
