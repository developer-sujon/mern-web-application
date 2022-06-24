//external import
const Profileroutes = require("express").Router();

//internal import
const ProfileController = require("../../controllers/auth/ProfileControllers");

//Registration User
Profileroutes.post("/RegistarProfile", ProfileController.RegistarProfile);
Profileroutes.get("/SelectProfile", ProfileController.SelectProfile);
Profileroutes.post("/LoginProfile", ProfileController.LoginProfile);

module.exports = Profileroutes;
