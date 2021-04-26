const { Movie } = require("./Movie");

const resolvers = {
  Query: {
    movies: () => Movie.getAll(),
    movie: (_, args) => Movie.getOne(args),
  },
  Mutation: {
    addMovie: (_, args) => Movie.add(args),
    deleteMovie: (_, args) => Movie.delete(args),
    editMovie: (_, args) => Movie.edit(args),
  },
};

module.exports = {
  resolvers,
};
