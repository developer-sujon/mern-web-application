//external import
const Chartroutes = require("express").Router();

//internal import
const ChartControllers = require("../controllers/ChartControllers");
const { CheckLogin } = require("../middleware/CheckLogin");

//Create new Chart
Chartroutes.post("/", CheckLogin, ChartControllers.CreateChart);

//Select all Chart
Chartroutes.get("/", ChartControllers.SelectAllChart);

//Select a Chart by id
Chartroutes.get("/:ChartId", ChartControllers.SelectSingleChart);

//Update a Chart
Chartroutes.patch("/:ChartId", CheckLogin, ChartControllers.UpdatedChart);

//Delete  a Chart
Chartroutes.delete("/:ChartId", CheckLogin, ChartControllers.DeleteChart);

module.exports = Chartroutes;
