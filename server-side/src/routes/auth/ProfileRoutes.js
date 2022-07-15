//external import
const Profileroutes = require("express").Router();

//internal import
const ProfileController = require("../../controllers/auth/ProfileControllers");
const { CheckLogin } = require("../../middleware/CheckLogin");

//Registration User
Profileroutes.post("/RegistarProfile", ProfileController.RegistarProfile);
Profileroutes.get(
  "/SelectProfile",
  CheckLogin,
  ProfileController.SelectProfile,
);
Profileroutes.post("/LoginProfile", ProfileController.LoginProfile);

Profileroutes.put(
  "/changePassword",
  CheckLogin,
  ProfileController.changePassword,
);

module.exports = Profileroutes;
