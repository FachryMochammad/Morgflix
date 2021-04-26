const router = require("express").Router();
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const movieRouter = require("./movie");
const seriesRouter = require("./series");

router.get("/", async (req, res) => {
  try {
    const entertainme = JSON.parse(await redis.get("entertainme"));
    if (entertainme) {
      res.status(200).json(entertainme);
    } else {
      let movies;
      axios
        .get("http://localhost:4001/movies")
        .then(({ data }) => {
          movies = data;
          return axios.get("http://localhost:4002/series");
        })
        .then(({ data }) => {
          const tvSeries = data;
          redis.set("entertainme", JSON.stringify({ movies, tvSeries }));
          res.status(200).json({ movies, tvSeries });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.use(movieRouter);
router.use(seriesRouter);

module.exports = router;
