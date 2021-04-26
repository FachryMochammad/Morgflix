import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Navbar, Loading, Error } from "../components";
import { EDIT_MOVIE, GET_MOVIES, GET_MOVIE } from "../queries";
import { createTags } from "../helpers/createTags";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const EditMovie = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: { id },
  });
  const [title, setTitle] = useState(`${data.movie.title}`);
  const [overview, setOverview] = useState(`${data.movie.overview}`);
  const [poster, setPoster] = useState(`${data.movie.poster_path}`);
  const [popularity, setPopularity] = useState(`${data.movie.popularity}`);
  const [tags, setTags] = useState(`${data.movie.tags}`);
  const [editMovie] = useMutation(EDIT_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }],
  });

  const editMovieInput = (event) => {
    event.preventDefault();
    if (!title || !overview || !poster || !popularity || !tags) {
      toast.error(`Failed to edit movie!`, {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const tagsArr = createTags(tags);
      editMovie({
        variables: {
          id,
          movieInput: {
            title,
            overview,
            poster_path: poster,
            popularity: +popularity,
            tags: tagsArr,
          },
        },
      });
      toast.success(`Successfully edit ${title}!`, {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
      history.push(`/movies/${id}`);
    }
  };

  if (loading) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <div
      className="container-fluid"
      style={{ background: "black", height: "100vh" }}
    >
      <Navbar />
      <div
        className="text-center"
        style={{
          paddingTop: "7rem",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <span style={{ fontSize: "40px", fontWeight: "600", color: "#fff" }}>
            EDIT MOVIE
          </span>
        </div>
        <div>
          <form
            onSubmit={(event) => editMovieInput(event)}
            className="mt-3"
            style={{ width: "550px" }}
          >
            <div className="input-group flex-nowrap">
              <span
                className="input-group-text"
                id="addon-wrapping"
                style={{ background: " transparent", color: "white" }}
              >
                Title
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Title"
                aria-describedby="addon-wrapping"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="input-group flex-nowrap mt-3">
              <span
                className="input-group-text"
                id="addon-wrapping"
                style={{ background: " transparent", color: "white" }}
              >
                Overview
              </span>
              <textarea
                className="form-control"
                aria-label="Overview"
                aria-describedby="addon-wrapping"
                onChange={(e) => setOverview(e.target.value)}
                value={overview}
              />
            </div>
            <div className="input-group flex-nowrap mt-3">
              <span
                className="input-group-text"
                id="addon-wrapping"
                style={{ background: " transparent", color: "white" }}
              >
                Movie Poster
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Movie Poster"
                aria-describedby="addon-wrapping"
                onChange={(e) => setPoster(e.target.value)}
                value={poster}
              />
            </div>
            <div className="input-group flex-nowrap mt-3">
              <span
                className="input-group-text"
                id="addon-wrapping"
                style={{ background: " transparent", color: "white" }}
              >
                Popularity
              </span>
              <input
                type="number"
                className="form-control"
                aria-label="Popularity"
                aria-describedby="addon-wrapping"
                onChange={(e) => setPopularity(e.target.value)}
                value={popularity}
              />
            </div>
            <div className="input-group flex-nowrap mt-3">
              <span
                className="input-group-text"
                id="addon-wrapping"
                style={{ background: " transparent", color: "white" }}
              >
                Tags
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Tags"
                aria-describedby="addon-wrapping"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </div>
            <div className="input-group flex-nowrap mt-3">
              <button
                className="btn btn-danger"
                style={{ width: "600px", color: "white" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMovie;
