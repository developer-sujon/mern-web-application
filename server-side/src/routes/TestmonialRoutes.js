//external import
const TestmonialRoutes = require("express").Router();

//internal import
const TestmonialControllers = require("../controllers/TestmonialControllers");
const { CheckLogin } = require("../middleware/CheckLogin");

//Create new Testmonial
TestmonialRoutes.post("/", CheckLogin, TestmonialControllers.CreateTestmonial);

//Select all Testmonial
TestmonialRoutes.get("/", TestmonialControllers.SelectAllTestmonial);

//Select a Testmonial by id
TestmonialRoutes.get(
  "/:TestmonialId",
  TestmonialControllers.SelectSingleTestmonial,
);

//Update a Testmonial
TestmonialRoutes.patch(
  "/:TestmonialId",
  CheckLogin,
  TestmonialControllers.UpdatedTestmonial,
);

//Delete  a Testmonial
TestmonialRoutes.delete(
  "/:TestmonialId",
  CheckLogin,
  TestmonialControllers.DeleteTestmonial,
);

module.exports = TestmonialRoutes;
