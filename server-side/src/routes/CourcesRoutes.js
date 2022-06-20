//external import
const CourseRoutes = require("express").Router();

//internal import
const CourseControllers = require("../controllers/CourseControllers");
const { CheckLogin } = require("../middleware/CheckLogin");

//Create new Course
CourseRoutes.post("/", CheckLogin, CourseControllers.CreateCourse);

//Select all Course
CourseRoutes.get("/", CourseControllers.SelectAllCourse);

//Select a Course by id
CourseRoutes.get("/:CourseId", CourseControllers.SelectSingleCourse);

//Update a Course
CourseRoutes.patch("/:CourseId", CheckLogin, CourseControllers.UpdatedCourse);

//Delete  a Course
CourseRoutes.delete("/:CourseId", CheckLogin, CourseControllers.deleteCourse);

module.exports = CourseRoutes;
