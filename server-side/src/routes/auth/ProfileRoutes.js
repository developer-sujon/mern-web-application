//external import
const ProfileRoutes = require("express").Router();

//internal import
const ProfileController = require("../../controllers/auth/ProfileControllers");

//Registration User
ProfileRoutes.post("/RegistarProfile", ProfileController.RegistarProfile);
ProfileRoutes.get("/SelectProfile", ProfileController.SelectProfile);
ProfileRoutes.post("/LoginProfile", ProfileController.LoginProfile);

module.exports = ProfileRoutes;
