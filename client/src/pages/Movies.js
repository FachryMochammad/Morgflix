import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Navbar, MovieCard, Loading, Error } from "../components";
import { GET_MOVIES } from "../queries";

const Movies = () => {
  const history = useHistory();
  const { data, loading, error } = useQuery(GET_MOVIES);

  if (loading) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <div
      className="container-fluid"
      style={{
        background: "black",
        height: data.movies.length > 4 ? "" : "100vh",
      }}
    >
      <Navbar />
      <div className="col" style={{ paddingTop: "6rem" }}>
        <h1 style={{ color: "white", paddingLeft: "3rem" }}>
          Movies
          <span style={{ marginLeft: "2rem", marginRight: "2rem" }}>|</span>
          <span
            className="btn btn-danger"
            style={{
              color: "white",
              fontSize: "13px",
            }}
            onClick={(event) => {
              event.preventDefault();
              history.push("/movies/add");
            }}
          >
            Add Movie
          </span>
        </h1>

        <div className="row">
          {data.movies.map((movie) => (
            <MovieCard movie={movie} key={movie._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
