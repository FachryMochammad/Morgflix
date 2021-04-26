const router = require("express").Router();
const SeriesController = require("../controllers/seriesController");

router.get("/", SeriesController.welcome);
router.get("/series", SeriesController.seriesList);
router.post("/series", SeriesController.addSeries);
router.get("/series/:id", SeriesController.getOneSeries);
router.delete("/series/:id", SeriesController.deleteSeries);
router.put("/series/:id", SeriesController.editSeries);

module.exports = router;
