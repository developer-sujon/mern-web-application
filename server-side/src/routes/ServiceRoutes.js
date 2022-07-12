//external import
const Serviceroutes = require("express").Router();

//internal import
const ServiceControllers = require("../controllers/ServiceControllers");
const { CheckLogin } = require("../middleware/CheckLogin");

//Create new Service
Serviceroutes.post("/", CheckLogin, ServiceControllers.CreateService);

//Select all Service
Serviceroutes.get("/", ServiceControllers.SelectAllService);

//Select a Service by id
Serviceroutes.get(
  "/:ServiceId",

  ServiceControllers.SelectSingleService,
);

//Update a Service
Serviceroutes.patch(
  "/:ServiceId",
  CheckLogin,
  ServiceControllers.UpdatedService,
);

//Delete  a Service
Serviceroutes.delete(
  "/:ServiceId",
  CheckLogin,
  ServiceControllers.DeleteService,
);

module.exports = Serviceroutes;
