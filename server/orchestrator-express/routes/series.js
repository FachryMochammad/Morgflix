const seriesRouter = require("express").Router();
const SeriesController = require("../controllers/seriesController");

seriesRouter.get("/series", SeriesController.seriesList);
seriesRouter.post("/series", SeriesController.addSeries);
seriesRouter.get("/series/:id", SeriesController.getOneSeries);
seriesRouter.delete("/series/:id", SeriesController.deleteSeries);
seriesRouter.put("/series/:id", SeriesController.editSeries);

module.exports = seriesRouter;
