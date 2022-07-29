import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <>
      <ul className="navbar-list">
        <li className="navbar-list___list-item">
          <Link to="task-list">Task List</Link>
        </li>
        <li className="navbar-list___list-item">
          <Link to="/">Create new task</Link>
        </li>
      </ul>
    </>
  );
}
