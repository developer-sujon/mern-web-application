//external import
const Portfolioroutes = require("express").Router();

//internal import
const PortfolioControllers = require("../controllers/PortfolioControllers");
const { CheckLogin } = require("../middleware/CheckLogin");

//Create new Profile
Portfolioroutes.post("/", CheckLogin, PortfolioControllers.CreatePortfolio);

//Select all Profile
Portfolioroutes.get("/", PortfolioControllers.SelectAllPortfolio);

//Select a Profile by id
Portfolioroutes.get(
  "/:PortfolioId",

  PortfolioControllers.SelectSinglePortfolio,
);

//Update a Profile
Portfolioroutes.patch(
  "/:PortfolioId",
  CheckLogin,
  PortfolioControllers.UpdatedPortfolio,
);

//Delete  a Profile
Portfolioroutes.delete(
  "/:PortfolioId",
  CheckLogin,
  PortfolioControllers.DeletePortfolio,
);

module.exports = Portfolioroutes;
