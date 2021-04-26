import React from "react";
import { useQuery } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { cache } from "../config/graphql";
import { Loading, Error, Navbar } from "../components";
import { GET_MOVIE, GET_MY_LIST } from "../queries";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const MovieDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data, loading, error } = useQuery(GET_MOVIE, { variables: { id } });

  const addToMyList = (event, dataMovie) => {
    event.preventDefault();
    const existingData = cache.readQuery({
      query: GET_MY_LIST,
    });
    const isFound = existingData.myList.find(
      (list) => list.title === dataMovie.title
    );
    if (!isFound) {
      toast.success(`Added ${dataMovie.title} to your list!`, {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
      cache.writeQuery({
        query: GET_MY_LIST,
        data: {
          myList: [dataMovie, ...existingData.myList],
        },
      });
    } else {
      toast.error(`${dataMovie.title} is already on your list!`, {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  if (loading || !data) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <div
      className="container-fluid"
      style={{
        color: "white",
        background: "black",
        height: "100vh",
      }}
    >
      <Navbar />
      <div
        style={{
          paddingTop: "6rem",
          paddingLeft: "6rem",
          paddingRight: "6rem",
        }}
      >
        <h1 className="movie-title-detail">
          {data.movie.title}
          <span style={{ marginLeft: "2rem", marginRight: "2rem" }}>|</span>
          <span
            className="btn btn-danger"
            style={{
              color: "white",
              fontSize: "13px",
            }}
            onClick={(event) => {
              event.preventDefault();
              history.push(`/movies/edit/${id}`);
            }}
          >
            Edit Movie
          </span>
        </h1>
        {data.movie.tags.map((el, i) => (
          <span className="movie-genre ml-1" key={i}>
            {el}
          </span>
        ))}
        {" | "}
        <span className="detail-info" style={{ fontSize: "13px" }}>
          Popularity: <span>{data.movie.popularity}</span>
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "1rem",
          }}
        >
          <div className="d-flex flex-column align-items-center">
            <div>
              <img
                src={data.movie.poster_path}
                alt={data.movie.title}
                style={{ marginBottom: "1rem" }}
                width="300"
                height="400"
              />
            </div>
            <div>
              <span
                className="btn btn-danger"
                style={{
                  color: "white",
                  fontSize: "13px",
                }}
                onClick={(event) => {
                  const dataMovie = {
                    _id: id,
                    title: data.movie.title,
                    overview: data.movie.overview,
                    poster_path: data.movie.poster_path,
                    popularity: data.movie.popularity,
                    tags: data.movie.tags,
                  };
                  addToMyList(event, dataMovie);
                }}
              >
                Add To My List
              </span>
            </div>
          </div>
          <div style={{ marginLeft: "30px" }}>
            <p className="detail-info">Overview:</p>
            <p className="movie-desc detail" style={{ textAlign: "justify" }}>
              {data.movie.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
