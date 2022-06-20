//external import
const ServiceRoutes = require("express").Router();

//internal import
const ServiceControllers = require("../controllers/ServiceControllers");
const { CheckLogin } = require("../middleware/CheckLogin");

//Create new Service
ServiceRoutes.post("/", CheckLogin, ServiceControllers.CreateService);

//Select all Service
ServiceRoutes.get("/", ServiceControllers.SelectAllService);

//Select a Service by id
ServiceRoutes.get("/:ServiceId", ServiceControllers.SelectSingleService);

//Update a Service
ServiceRoutes.patch(
  "/:ServiceId",
  CheckLogin,
  ServiceControllers.UpdatedService,
);

//Delete  a Service
ServiceRoutes.delete(
  "/:ServiceId",
  CheckLogin,
  ServiceControllers.DeleteService,
);

module.exports = ServiceRoutes;
