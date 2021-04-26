const movieRouter = require("express").Router();
const MovieController = require("../controllers/movieController");

movieRouter.get("/movies", MovieController.movieList);
movieRouter.post("/movies", MovieController.addMovie);
movieRouter.get("/movies/:id", MovieController.getOneMovie);
movieRouter.delete("/movies/:id", MovieController.deleteMovie);
movieRouter.put("/movies/:id", MovieController.editMovie);

module.exports = movieRouter;
