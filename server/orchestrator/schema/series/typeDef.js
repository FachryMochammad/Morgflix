const { gql } = require("apollo-server");

const typeDef = gql`
  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    allSeries: [Series]
    series(seriesId: ID!): Series
  }

  input newSeries {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type MessageSeries {
    message: String
  }

  extend type Mutation {
    addSeries(series: newSeries): Series
    deleteSeries(seriesId: ID!): MessageSeries
    editSeries(seriesId: ID!, series: newSeries): Series
  }
`;

module.exports = {
  typeDef,
};
