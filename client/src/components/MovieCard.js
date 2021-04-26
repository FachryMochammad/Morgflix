import React from "react";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Loading, Error } from "../components";
import { GET_MOVIES, DELETE_MOVIE } from "../queries";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const MovieCard = ({ movie }) => {
  const history = useHistory();
  const [deleteMovie, { loading, error }] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }],
  });
  const toMovieDetail = (event, id) => {
    event.preventDefault();
    history.push(`/movies/${id}`);
  };

  if (loading) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <div className="col-md-4 col-sm-1 col-lg-3 mt-3 mb-3">
      <div
        className="card"
        style={{ border: "none", background: "transparent" }}
      >
        <span className="circle">
          <i
            title="Delete Movie"
            className="bi bi-calendar2-x delete-icon"
            onClick={() => {
              const id = movie._id;
              deleteMovie({ variables: { id } });
              toast.success(`Successfully delete ${movie.title}!`, {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
            }}
          ></i>
        </span>
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
