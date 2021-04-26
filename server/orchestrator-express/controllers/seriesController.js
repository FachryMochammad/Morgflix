const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

class SeriesController {
  static async seriesList(req, res) {
    try {
      const series = JSON.parse(await redis.get("series"));
      if (series) {
        res.status(200).json(series);
      } else {
        const { data } = await axios.get("http://localhost:4002/series");
        res.status(200).json(data);
        redis.set("series", JSON.stringify(data));
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async addSeries(req, res) {
    try {
      await redis.del("series");
      await redis.del("entertainme");
      const { data } = await axios.post("http://localhost:4002/series", {
        ...req.body,
      });
      res.status(201).json(data);
    } catch (error) {
      res.send(error);
    }
  }

  static async deleteSeries(req, res) {
    try {
      await redis.del("series");
      await redis.del("entertainme");
      const id = req.params.id;
      const { data } = await axios.delete(
        `http://localhost:4002/series/${id}`,
        {
          ...req.body,
        }
      );
      res.status(200).json(data);
    } catch (error) {
      res.send(error);
    }
  }

  static async getOneSeries(req, res) {
    try {
      const id = req.params.id;
      const series = JSON.parse(await redis.get("series"));
      if (series) {
        const foundSeries = series.find((series) => series._id === id);
        if (foundSeries) {
          res.status(200).json(foundSeries);
        } else {
          const { data } = await axios.get(
            `http://localhost:4002/series/${id}`
          );
          res.status(200).json(data);
        }
      } else {
        const { data } = await axios.get(`http://localhost:4002/series/${id}`);
        res.status(200).json(data);
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async editSeries(req, res) {
    try {
      await redis.del("series");
      await redis.del("entertainme");
      const id = req.params.id;
      const { data } = await axios.put(`http://localhost:4002/series/${id}`, {
        ...req.body,
      });
      res.status(201).json(data);
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = SeriesController;
