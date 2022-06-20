//external import
const ChartRoutes = require("express").Router();

//internal import
const ChartControllers = require("../controllers/ChartControllers");
const { CheckLogin } = require("../middleware/CheckLogin");

//Create new Chart
ChartRoutes.post("/", CheckLogin, ChartControllers.CreateChart);

//Select all Chart
ChartRoutes.get("/", ChartControllers.SelectAllChart);

//Select a Chart by id
ChartRoutes.get("/:ChartId", ChartControllers.SelectSingleChart);

//Update a Chart
ChartRoutes.patch("/:ChartId", CheckLogin, ChartControllers.UpdatedChart);

//Delete  a Chart
ChartRoutes.delete("/:ChartId", CheckLogin, ChartControllers.DeleteChart);

module.exports = ChartRoutes;
