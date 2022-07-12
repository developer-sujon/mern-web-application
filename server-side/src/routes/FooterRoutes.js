//external import
const Footerroutes = require("express").Router();

//internal import
const FooterControllers = require("../controllers/FooterControllers");
const { CheckLogin } = require("../middleware/CheckLogin");

//Create new Footer
Footerroutes.post("/", CheckLogin, FooterControllers.CreateFooter);

//Select all Footer
Footerroutes.get("/", FooterControllers.SelectAllFooter);

//Select a Footer by id
Footerroutes.get(
  "/:FooterId",

  FooterControllers.SelectSingleFooter,
);

//Update a Footer
Footerroutes.patch("/:FooterId", CheckLogin, FooterControllers.UpdatedFooter);

//Delete  a Footer
Footerroutes.delete("/:FooterId", CheckLogin, FooterControllers.DeleteFooter);

module.exports = Footerroutes;
