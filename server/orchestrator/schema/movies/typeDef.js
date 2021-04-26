const { gql } = require("apollo-server");

const typeDef = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    movies: [Movie]
    movie(movieId: ID!): Movie
  }

  input newMovie {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type MessageMovie {
    message: String
  }

  extend type Mutation {
    addMovie(movie: newMovie): Movie
    deleteMovie(movieId: ID!): MessageMovie
    editMovie(movieId: ID!, movie: newMovie): Movie
  }
`;

module.exports = {
  typeDef,
};
