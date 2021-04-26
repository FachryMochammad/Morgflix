import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Home,
  Series,
  Movies,
  MovieDetail,
  AddMovie,
  EditMovie,
  MyList,
} from "./pages";
import { ApolloProvider } from "@apollo/client/react";
import client from "./config/graphql";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/movies/edit/:id">
            <EditMovie />
          </Route>
          <Route path="/movies/add">
            <AddMovie />
          </Route>
          <Route path="/movies/:id">
            <MovieDetail />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/series">
            <Series />
          </Route>
          <Route path="/mylist">
            <MyList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
