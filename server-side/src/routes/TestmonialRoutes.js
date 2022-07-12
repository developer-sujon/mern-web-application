//external import
const Testmonialroutes = require("express").Router();

//internal import
const TestmonialControllers = require("../controllers/TestmonialControllers");
const { CheckLogin } = require("../middleware/CheckLogin");

//Create new Testmonial
Testmonialroutes.post("/", CheckLogin, TestmonialControllers.CreateTestmonial);

//Select all Testmonial
Testmonialroutes.get("/", TestmonialControllers.SelectAllTestmonial);

//Select a Testmonial by id
Testmonialroutes.get(
  "/:TestmonialId",
  TestmonialControllers.SelectSingleTestmonial,
);

//Update a Testmonial
Testmonialroutes.patch(
  "/:TestmonialId",
  CheckLogin,
  TestmonialControllers.UpdatedTestmonial,
);

//Delete  a Testmonial
Testmonialroutes.delete(
  "/:TestmonialId",
  CheckLogin,
  TestmonialControllers.DeleteTestmonial,
);

module.exports = Testmonialroutes;
