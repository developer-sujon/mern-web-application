//external import
const Informationroutes = require("express").Router();

//internal import
const InformationControllers = require("../controllers/InpormationControllers");
const { CheckLogin } = require("../middleware/CheckLogin");

//Create new Information
Informationroutes.post(
  "/",
  CheckLogin,
  InformationControllers.CreateInformation,
);

//Select all Information
Informationroutes.get(
  "/",

  InformationControllers.SelectAllInformation,
);

//Select a Information by id
Informationroutes.get(
  "/:InformationId",

  InformationControllers.SelectSingleInformation,
);

//Update a Information
Informationroutes.patch(
  "/:InformationId",
  CheckLogin,
  InformationControllers.UpdatedInformation,
);

//Delete  a Information
Informationroutes.delete(
  "/:InformationId",
  CheckLogin,
  InformationControllers.DeleteInformation,
);

module.exports = Informationroutes;
