const { Movie } = require("./Movie");
const { resolvers } = require("./resolvers");
const { typeDef } = require("./typeDef");

module.exports = {
  Movie,
  resolvers,
  typeDef,
};
