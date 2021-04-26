import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_MY_LIST } from "../queries";

export const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "http://54.152.21.25:4000",
  cache,
});

cache.writeQuery({
  query: GET_MY_LIST,
  data: {
    myList: [],
  },
});

export default client;
