//external import
const PortfolioRoutes = require("express").Router();

//internal import
const PortfolioControllers = require("../controllers/PortfolioControllers");
const { CheckLogin } = require("../middleware/CheckLogin");

//Create new contact
PortfolioRoutes.post("/", CheckLogin, PortfolioControllers.CreatePortfolio);

//Select all contact
PortfolioRoutes.get("/", PortfolioControllers.SelectAllPortfolio);

//Select a contact by id
PortfolioRoutes.get(
  "/:PortfolioId",
  PortfolioControllers.SelectSinglePortfolio,
);

//Update a contact
PortfolioRoutes.patch(
  "/:PortfolioId",
  CheckLogin,
  PortfolioControllers.UpdatedPortfolio,
);

//Delete  a contact
PortfolioRoutes.delete(
  "/:PortfolioId",
  CheckLogin,
  PortfolioControllers.DeletePortfolio,
);

module.exports = PortfolioRoutes;
