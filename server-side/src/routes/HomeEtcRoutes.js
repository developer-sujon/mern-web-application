//external import
const HomeEtcRoutes = require("express").Router();

//internal import
const HomeEtcControllers = require("../controllers/HomeEtcControllers");
const { CheckLogin } = require("../middleware/CheckLogin");

//Create new HomeEtc
HomeEtcRoutes.post("/", CheckLogin, HomeEtcControllers.CreateHomeEtc);

//Select all HomeEtc
HomeEtcRoutes.get("/", HomeEtcControllers.SelectAllHomeEtc);

//Select a HomeEtc by id
HomeEtcRoutes.get("/:HomeEtcId", HomeEtcControllers.SelectSingleHomeEtc);

//Update a HomeEtc
HomeEtcRoutes.patch(
  "/:HomeEtcId",
  CheckLogin,
  HomeEtcControllers.UpdatedHomeEtc,
);

//Delete  a HomeEtc
HomeEtcRoutes.delete(
  "/:HomeEtcId",
  CheckLogin,
  HomeEtcControllers.DeleteHomeEtc,
);

module.exports = HomeEtcRoutes;
