import React from "react";
import { useHistory } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const history = useHistory();

  const toMovieDetail = (event, id) => {
    event.preventDefault();
    history.push(`/movies/${id}`);
  };

  return (
    <div className="col-md-4 col-sm-1 col-lg-3 mt-3 mb-3">
      <div
        className="card"
        style={{ border: "none", background: "transparent" }}
      >
        <img
          src={movie.poster_path}
          className="card-image"
          alt={movie.title}
          onClick={(event) => {
            const id = movie._id;
            toMovieDetail(event, id);
          }}
        />
        <div className="card-body">
          <p
            className="movie-title"
            onClick={(event) => {
              const id = movie._id;
              toMovieDetail(event, id);
            }}
          >
            {movie.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
