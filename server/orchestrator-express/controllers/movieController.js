const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

class MovieController {
  static async movieList(req, res) {
    try {
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        res.status(200).json(movies);
      } else {
        const { data } = await axios.get("http://localhost:4001/movies");
        res.status(200).json(data);
        redis.set("movies", JSON.stringify(data));
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async addMovie(req, res) {
    try {
      await redis.del("movies");
      await redis.del("entertainme");
      const { data } = await axios.post("http://localhost:4001/movies", {
        ...req.body,
      });
      res.status(201).json(data);
    } catch (error) {
      res.send(error);
    }
  }

  static async deleteMovie(req, res) {
    try {
      await redis.del("movies");
      await redis.del("entertainme");
      const id = req.params.id;
      const { data } = await axios.delete(`http://localhost:4001/movies/${id}`);
      res.status(200).json(data);
    } catch (error) {
      res.send(error);
    }
  }

  static async getOneMovie(req, res) {
    try {
      const id = req.params.id;
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        const movie = movies.find((movie) => movie._id === id);
        if (movie) {
          res.status(200).json(movie);
        } else {
          const { data } = await axios.get(
            `http://localhost:4001/movies/${id}`
          );
          res.status(200).json(data);
        }
      } else {
        const { data } = await axios.get(`http://localhost:4001/movies/${id}`);
        res.status(200).json(data);
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async editMovie(req, res) {
    try {
      await redis.del("movies");
      await redis.del("entertainme");
      const id = req.params.id;
      const { data } = await axios.put(`http://localhost:4001/movies/${id}`, {
        ...req.body,
      });
      res.status(201).json(data);
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = MovieController;
