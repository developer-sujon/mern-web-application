//external import
const Courseroutes = require("express").Router();

//internal import
const CourseControllers = require("../controllers/CourseControllers");
const { CheckLogin } = require("../middleware/CheckLogin");

//Create new Course
Courseroutes.post("/", CheckLogin, CourseControllers.CreateCourse);

//Select all Course
Courseroutes.get("/", CourseControllers.SelectAllCourse);

//Select a Course by id
Courseroutes.get(
  "/:CourseId",

  CourseControllers.SelectSingleCourse,
);

//Update a Course
Courseroutes.patch("/:CourseId", CheckLogin, CourseControllers.UpdatedCourse);

//Delete  a Course
Courseroutes.delete("/:CourseId", CheckLogin, CourseControllers.deleteCourse);

module.exports = Courseroutes;
