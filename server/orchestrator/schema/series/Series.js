const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

class Series {
  static async getAll() {
    try {
      const series = JSON.parse(await redis.get("series"));
      if (series) {
        return series;
      } else {
        const { data } = await axios.get("http://54.90.25.15:4002/series");
        redis.set("series", JSON.stringify(data));
        return data;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getOne(args) {
    try {
      const seriesId = args.seriesId;
      const series = JSON.parse(await redis.get("series"));
      if (series) {
        const oneSeries = series.find(
          (oneSeries) => oneSeries._id === seriesId
        );
        if (oneSeries) {
          return oneSeries;
        } else {
          const { data } = await axios.get(
            `http://54.90.25.15:4002/series/${seriesId}`
          );
          return data;
        }
      } else {
        const { data } = await axios.get(
          `http://54.90.25.15:4002/series/${seriesId}`
        );
        return data;
      }
    } catch (error) {
      throw error;
    }
  }

  static async add(args) {
    try {
      await redis.del("series");
      await redis.del("entertainme");
      const { data } = await axios.post("http://54.90.25.15:4002/series", {
        ...args.series,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async delete(args) {
    try {
      const seriesId = args.seriesId;
      await redis.del("series");
      await redis.del("entertainme");
      const { data } = await axios.delete(
        `http://54.90.25.15:4002/series/${seriesId}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async edit(args) {
    try {
      const seriesId = args.seriesId;
      await redis.del("series");
      await redis.del("entertainme");
      const { data } = await axios.put(
        `http://54.90.25.15:4002/series/${seriesId}`,
        {
          ...args.series,
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  Series,
};
