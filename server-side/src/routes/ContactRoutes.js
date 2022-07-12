//external import
const Contactroutes = require("express").Router();

//internal import
const ContactControllers = require("../controllers/ContactControllers");
const { CheckLogin } = require("../middleware/CheckLogin");

//Create new Contact
Contactroutes.post("/", ContactControllers.CreateContact);

//Select all Contact
Contactroutes.get("/", ContactControllers.SelectAllContact);

//Select a Contact by id
Contactroutes.get("/:ContactId", ContactControllers.SelectSingleContact);

//Update a Contact
Contactroutes.patch(
  "/:ContactId",
  CheckLogin,
  ContactControllers.UpdatedContact,
);

//Delete  a Contact
Contactroutes.delete(
  "/:ContactId",
  CheckLogin,
  ContactControllers.DeleteContact,
);

module.exports = Contactroutes;
