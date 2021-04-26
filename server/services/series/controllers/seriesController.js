const Series = require("../models/series");

class SeriesController {
  static welcome(req, res, next) {
    res.status(200).json({ message: "Welcome to microservice Series!" });
  }

  static seriesList(req, res, next) {
    Series.find()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(next);
  }

  static addSeries(req, res, next) {
    const newSeries = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    };
    Series.create(newSeries)
      .then((data) => {
        res.status(201).json(data.ops[0]);
      })
      .catch(next);
  }

  static getOneSeries(req, res, next) {
    const id = req.params.id;
    Series.findById(id)
      .then((data) => {
        console.log(data);
        if (data) {
          res.status(200).json(data);
        } else {
          next({
            code: 404,
            message: "Cannot find series with this id",
          });
        }
      })
      .catch(next);
  }

  static deleteSeries(req, res, next) {
    const id = req.params.id;
    Series.findByIdAndDelete(id)
      .then((data) => {
        if (data.deletedCount) {
          res.status(200).json({ message: "Successfully delete this series!" });
        } else {
          next({
            code: 404,
            message: "Cannot find series with this id",
          });
        }
      })
      .catch(next);
  }

  static editSeries(req, res, next) {
    const id = req.params.id;
    const updatedSeries = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    };
    Series.findByIdAndUpdate(id, updatedSeries)
      .then((data) => {
        if (data.matchedCount > 0) {
          res.status(201).json(updatedSeries);
        } else {
          next({
            code: 404,
            message: "Cannot find series with this id",
          });
        }
      })
      .catch(next);
  }
}

module.exports = SeriesController;
