//internal import
const Course = require("../models/CourseModel");

//Create new chart
exports.CreateCourse = (req, res) => {
  const { courseName, courseDescription, courseThumbnail, courseCover } =
    req.body;
  const newCourse = {
    courseName,
    courseDescription,
    courseThumbnail,
    courseCover,
    user: req.id,
  };

  Course.create(newCourse, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      return res.status(201).json({ status: "success", data: data });
    }
  });
};

//Select all Courses
exports.SelectAllCourse = (req, res) => {
  const projection = " -createdAt -updatedAt";

  Course.find({}, projection)
    .populate("user", "name userName _id")
    .exec()
    .then((data) => {
      if (data && data.length > 0) {
        return res.json({ status: "success", data: data });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Course not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    });
};

//Select a Course by id
exports.SelectSingleCourse = (req, res) => {
  const { CourseId } = req.params;
  const projection = "-createdAt -updatedAt";

  Course.find({ _id: CourseId }, projection)
    .populate("user", "name userName _id")
    .exec()
    .then((data) => {
      if (data && data.length > 0) {
        return res.json({ status: "success", data: data });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Course not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    });
};

//Update a Course
exports.UpdatedCourse = (req, res) => {
  const { CourseId } = req.params;
  const { courseName, courseDescription, courseThumbnail, courseCover } =
    req.body;
  const newCourse = {
    courseName,
    courseDescription,
    courseThumbnail,
    courseCover,
  };

  Course.findByIdAndUpdate(
    { _id: CourseId },
    newCourse,
    { new: true },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ status: "fail", data: err.message });
      } else {
        if (data) {
          return res.json({
            status: "success",
            data: "Course Update Successfull",
          });
        } else {
          return res
            .status(404)
            .json({ status: "fail", data: "Course not found" });
        }
      }
    },
  );
};

//Delete  a Course
exports.deleteCourse = (req, res) => {
  const { CourseId } = req.params;

  Course.findByIdAndDelete({ _id: CourseId }, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      if (data) {
        return res.json({
          status: "success",
          data: "Course Delete Successfull",
        });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Course not found" });
      }
    }
  });
};
