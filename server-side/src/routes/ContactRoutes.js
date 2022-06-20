//external import
const ContactRoutes = require("express").Router();

//internal import
const ContactControllers = require("../controllers/ContactControllers");

//Create new Contact
ContactRoutes.post("/", ContactControllers.CreateContact);

//Select all Contact
ContactRoutes.get("/", ContactControllers.SelectAllContact);

//Select a Contact by id
ContactRoutes.get("/:ContactId", ContactControllers.SelectSingleContact);

//Update a Contact
ContactRoutes.patch("/:ContactId", ContactControllers.UpdatedContact);

//Delete  a Contact
ContactRoutes.delete("/:ContactId", ContactControllers.DeleteContact);

module.exports = ContactRoutes;
