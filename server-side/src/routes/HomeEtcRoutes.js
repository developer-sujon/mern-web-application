//external import
const HomeEtcroutes = require("express").Router();

//internal import
const HomeEtcControllers = require("../controllers/HomeEtcControllers");
const { CheckLogin } = require("../middleware/CheckLogin");

//Create new HomeEtc
HomeEtcroutes.post("/", CheckLogin, HomeEtcControllers.CreateHomeEtc);

//Select all HomeEtc
HomeEtcroutes.get("/", HomeEtcControllers.SelectAllHomeEtc);

//Select a HomeEtc by id
HomeEtcroutes.get(
  "/:HomeEtcId",

  HomeEtcControllers.SelectSingleHomeEtc,
);

//Update a HomeEtc
HomeEtcroutes.patch(
  "/:HomeEtcId",
  CheckLogin,
  HomeEtcControllers.UpdatedHomeEtc,
);

//Delete  a HomeEtc
HomeEtcroutes.delete(
  "/:HomeEtcId",
  CheckLogin,
  HomeEtcControllers.DeleteHomeEtc,
);

module.exports = HomeEtcroutes;
