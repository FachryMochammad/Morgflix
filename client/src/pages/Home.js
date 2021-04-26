import React from "react";
import { useQuery } from "@apollo/client";
import { Navbar, MovieCard, ListCard, Loading, Error } from "../components";
import { GET_ALL } from "../queries";

const Home = () => {
  const { data, loading, error } = useQuery(GET_ALL);

  if (loading) return <Loading />;

  if (error) return <Error error={error} />;

  const browseAll = [...data.movies, ...data.allSeries];

  return (
    <>
      <div className="home-page" id="home">
        <Navbar />
        <div className="content" style={{ color: "white" }}>
          <h2>
            Welcome to Morg<span>flix</span>
          </h2>
          <p>Fulfill your daily dose of watching movies or series!</p>
          <a
            href="#browse"
            className="btn btn-danger"
            style={{ color: "white" }}
          >
            Watch Now
          </a>
        </div>
      </div>
      <div
        className="container-fluid"
        id="browse"
        style={{
          background: "black",
          height: browseAll.length > 4 ? "" : "100vh",
        }}
      >
        <div className="col" style={{ paddingTop: "6rem" }}>
          <h1 style={{ color: "white", paddingLeft: "3rem" }}>Browse</h1>
          <div className="row">
            {data.movies.map((movie) => (
              <MovieCard movie={movie} key={movie._id} />
            ))}
            {data.allSeries.map((series) => (
              <ListCard movie={series} key={series._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
