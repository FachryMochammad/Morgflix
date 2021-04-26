import React from "react";
import { useQuery } from "@apollo/client";
import { Navbar, ListCard, Loading, Error } from "../components";
import { GET_MY_LIST } from "../queries";

const Movies = () => {
  const { data, loading, error } = useQuery(GET_MY_LIST);

  if (loading) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <div
      className="container-fluid"
      style={{
        background: "black",
        height: data.myList.length > 4 ? "" : "100vh",
      }}
    >
      <Navbar />
      <div className="col" style={{ paddingTop: "6rem" }}>
        <h1 style={{ color: "white", paddingLeft: "3rem" }}>My List</h1>
        <div className="row">
          {data.myList.map((list) => (
            <ListCard movie={list} key={list._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
