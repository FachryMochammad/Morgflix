import React from "react";
import morgyFix from "../assets/images/morgyFix.png";
import { useHistory, Link } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
  const toHome = (event) => {
    event.preventDefault();
    history.push("/");
  };

  return (
    <div className="header">
      <div className="logo" onClick={(event) => toHome(event)}>
        <img src={morgyFix} alt="Logo" className="logo" />
        <h4 className="logo-name">
          <span style={{ color: "#fff" }}>ORG</span>FLIX
        </h4>
      </div>
      <ul className="navigation">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
        <li>
          <Link to="/series">TV Series</Link>
        </li>
        <li>
          <Link to="/mylist">My List</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
