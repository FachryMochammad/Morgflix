const express = require("express");
const { connectMongoDB } = require("./config/mongodb");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const PORT = process.env.PORT || 4002;

connectMongoDB((connected) => {
  if (connected) {
    console.log("Connecting to mongodb: Success!");
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(router);
    app.use(errorHandler);

    app.listen(PORT, () => console.log(`This app running on port:`, PORT));
  } else {
    console.log("Connecting to mongodb: Failed!");
  }
});
