//external import
const { Schema, model } = require("mongoose");

const courseSchema = Schema(
  {
    courseName: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    courseDescription: {
      type: String,
      maxLength: 300,
      trim: true,
    },
    courseThumbnail: {
      type: String,
    },
    courseCover: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  { versionKey: false, timestamps: true },
);

const Course = new model("Course", courseSchema);

module.exports = Course;
