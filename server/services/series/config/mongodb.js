const { MongoClient } = require("mongodb");

let database = null;

const connectMongoDB = (cb) => {
  const uri = "mongodb://localhost:27017";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client
    .connect()
    .then((_) => {
      cb(true);
      database = client.db("Entertainme");
    })
    .catch((err) => {
      cb(false);
    });
};

const getDatabase = () => {
  return database;
};

module.exports = {
  connectMongoDB,
  getDatabase,
};
