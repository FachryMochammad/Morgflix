const router = require("express").Router();
const MovieController = require("../controllers/movieController");

router.get("/", MovieController.welcome);
router.get("/movies", MovieController.movieList);
router.post("/movies", MovieController.addMovie);
router.get("/movies/:id", MovieController.getOneMovie);
router.delete("/movies/:id", MovieController.deleteMovie);
router.put("/movies/:id", MovieController.editMovie);

module.exports = router;
