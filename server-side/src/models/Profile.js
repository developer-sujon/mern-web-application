const { Schema, model } = require("mongoose");

const profileModel = Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  userName: {
    type: String,
    require: true,
    unique: true,
    trim: true,
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
});

const Profile = new model("Profile", profileModel);

module.exports = Profile;
