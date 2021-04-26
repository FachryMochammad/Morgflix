import React from "react";
import { useQuery } from "@apollo/client";
import { Navbar, ListCard, Loading, Error } from "../components";
import { GET_ALL_SERIES } from "../queries";

const Series = () => {
  const { data, loading, error } = useQuery(GET_ALL_SERIES);

  if (loading) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <div
      className="container-fluid"
      style={{
        background: "black",
        height: data.allSeries.length > 4 ? "" : "100vh",
      }}
    >
      <Navbar />
      <div className="col" style={{ paddingTop: "6rem" }}>
        <h1 style={{ color: "white", paddingLeft: "3rem" }}>TV Series</h1>
        <div className="row">
          {data.allSeries.map((series) => (
            <ListCard movie={series} key={series._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Series;
