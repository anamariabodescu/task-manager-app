import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <>
      <ul className="navbar-list">
        <li className="navbar-list___list-item">
          <NavLink
            to="task-list"
            className={({ isActive }) => (isActive ? "activeLink" : undefined)}
          >
            Task List
          </NavLink>
        </li>
        <li className="navbar-list___list-item">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "activeLink" : undefined)}
          >
            Create new task
          </NavLink>
        </li>
      </ul>
    </>
  );
}
