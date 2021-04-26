const Movie = require("../models/movie");

class MovieController {
  static welcome(req, res, next) {
    res.status(200).json({ message: "Welcome to microservice Movie!" });
  }

  static movieList(req, res, next) {
    Movie.find()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(next);
  }

  static addMovie(req, res, next) {
    const newMovie = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    };
    Movie.create(newMovie)
      .then((data) => {
        res.status(201).json(data.ops[0]);
      })
      .catch(next);
  }

  static getOneMovie(req, res, next) {
    const id = req.params.id;
    Movie.findById(id)
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          next({
            code: 404,
            message: "Cannot find movie with this id",
          });
        }
      })
      .catch(next);
  }

  static deleteMovie(req, res, next) {
    const id = req.params.id;
    Movie.findByIdAndDelete(id)
      .then((data) => {
        if (data.deletedCount) {
          res.status(200).json({ message: "Successfully delete this movie!" });
        } else {
          next({
            code: 404,
            message: "Cannot find movie with this id",
          });
        }
      })
      .catch(next);
  }

  static editMovie(req, res, next) {
    const id = req.params.id;
    const updatedMovie = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    };
    Movie.findByIdAndUpdate(id, updatedMovie)
      .then((data) => {
        if (data.matchedCount > 0) {
          res.status(201).json(updatedMovie);
        } else {
          next({
            code: 404,
            message: "Cannot find movie with this id",
          });
        }
      })
      .catch(next);
  }
}

module.exports = MovieController;
