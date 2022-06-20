//external import
const InformationRoutes = require("express").Router();

//internal import
const InformationControllers = require("../controllers/InpormationControllers");
const { CheckLogin } = require("../middleware/CheckLogin");

//Create new Information
InformationRoutes.post(
  "/",
  CheckLogin,
  InformationControllers.CreateInformation,
);

//Select all Information
InformationRoutes.get("/", InformationControllers.SelectAllInformation);

//Select a Information by id
InformationRoutes.get(
  "/:InformationId",
  InformationControllers.SelectSingleInformation,
);

//Update a Information
InformationRoutes.patch(
  "/:InformationId",
  CheckLogin,
  InformationControllers.UpdatedInformation,
);

//Delete  a Information
InformationRoutes.delete(
  "/:InformationId",
  CheckLogin,
  InformationControllers.DeleteInformation,
);

module.exports = InformationRoutes;
