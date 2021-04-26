import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Navbar, Loading, Error } from "../components";
import { ADD_MOVIE, GET_MOVIES } from "../queries";
import { createTags } from "../helpers/createTags";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const AddMovie = () => {
  const history = useHistory();
  const [title, setTitle] = useState();
  const [overview, setOverview] = useState();
  const [poster, setPoster] = useState();
  const [popularity, setPopularity] = useState();
  const [tags, setTags] = useState();
  const [addMovie, { loading, error }] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }],
  });

  const addMovieInput = (event) => {
    event.preventDefault();
    if (!title || !overview || !poster || !popularity || !tags) {
      toast.error(`Failed to add movie!`, {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const tagsArr = createTags(tags);
      addMovie({
        variables: {
          movieInput: {
            title,
            overview,
            poster_path: poster,
            popularity: +popularity,
            tags: tagsArr,
          },
        },
      });
      toast.success(`Successfully add ${title}!`, {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
      history.push("/movies");
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
            ADD MOVIE
          </span>
        </div>
        <div>
          <form
            onSubmit={(event) => addMovieInput(event)}
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

export default AddMovie;
