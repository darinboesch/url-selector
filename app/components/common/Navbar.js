import React from "react";
import { Link } from "react-router";
import styles from "./Navbar.css";

const Navbar = () => (
  <nav className={"navbar navbar-default " + styles.navbar}>
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">URL Selector</Link>
      </div>
      <ul className="nav navbar-nav">
        <li className={location.pathname === "/" && "active"}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === "/all" && "active"}>
          <Link to="/all">All</Link>
        </li>
        <li className={location.pathname === "/favorites" && "active"}>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
