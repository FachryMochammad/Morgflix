const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

class Movie {
  static async getAll() {
    try {
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        return movies;
      } else {
        const { data } = await axios.get("http://54.90.25.15:4001/movies");
        redis.set("movies", JSON.stringify(data));
        return data;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getOne(args) {
    try {
      const movieId = args.movieId;
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        const movie = movies.find((movie) => movie._id === movieId);
        if (movie) {
          return movie;
        } else {
          const { data } = await axios.get(
            `http://54.90.25.15:4001/movies/${movieId}`
          );
          return data;
        }
      } else {
        const { data } = await axios.get(
          `http://54.90.25.15:4001/movies/${movieId}`
        );
        return data;
      }
    } catch (error) {
      throw error;
    }
  }

  static async add(args) {
    try {
      await redis.del("movies");
      await redis.del("entertainme");
      const { data } = await axios.post("http://54.90.25.15:4001/movies", {
        ...args.movie,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async delete(args) {
    try {
      const movieId = args.movieId;
      await redis.del("movies");
      await redis.del("entertainme");
      const { data } = await axios.delete(
        `http://54.90.25.15:4001/movies/${movieId}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async edit(args) {
    try {
      const movieId = args.movieId;
      await redis.del("movies");
      await redis.del("entertainme");
      const { data } = await axios.put(
        `http://54.90.25.15:4001/movies/${movieId}`,
        {
          ...args.movie,
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  Movie,
};
