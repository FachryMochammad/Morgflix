const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const movies = require("./schema/movies");
const series = require("./schema/series");

const typeDef = gql`
  type Query
  type Mutation
`;

const schema = makeExecutableSchema({
  typeDefs: [typeDef, movies.typeDef, series.typeDef],
  resolvers: [movies.resolvers, series.resolvers],
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
