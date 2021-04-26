import React from "react";
import { Navbar } from "./";

const Loading = () => {
  return (
    <div style={{ backgroundColor: "black", height: "100vh" }}>
      <Navbar />
      <div className="container">
        <div className="text-center">
          <div
            className="spinner-border"
            role="status"
            style={{ marginTop: "20rem", color: "#de0611" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
