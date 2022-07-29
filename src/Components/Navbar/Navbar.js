import React from "react";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <>
      <ul className="navbar-list">
        <li className="navbar-list___list-item">
          <a>Task List</a>
        </li>
        <li className="navbar-list___list-item">
          <a>Create new task</a>
        </li>
      </ul>
    </>
  );
}
