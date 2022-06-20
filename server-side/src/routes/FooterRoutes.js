//external import
const FooterRoutes = require("express").Router();

//internal import
const FooterControllers = require("../controllers/FooterControllers");
const { CheckLogin } = require("../middleware/CheckLogin");

//Create new Footer
FooterRoutes.post("/", CheckLogin, FooterControllers.CreateFooter);

//Select all Footer
FooterRoutes.get("/", FooterControllers.SelectAllFooter);

//Select a Footer by id
FooterRoutes.get("/:FooterId", FooterControllers.SelectSingleFooter);

//Update a Footer
FooterRoutes.patch("/:FooterId", CheckLogin, FooterControllers.UpdatedFooter);

//Delete  a Footer
FooterRoutes.delete("/:FooterId", CheckLogin, FooterControllers.DeleteFooter);

module.exports = FooterRoutes;
