import React from "react";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import Login from "../Login/Login";
import "./Header.scss";

// import logo from "../Assets/logo.svg";

function Header() {
  return (
    <div className="header">
      <div className="header__content">
        {/* <img className="header__logo" src={logo} alt="logo" /> */}
        <h1 className="header__content__title">Task Manager App</h1>
        <div className="header__content__right-column">
          <ThemeSwitcher className="header__content__right-column__theme-switcher" />
          <Login className="header__content__right-column__login" />
        </div>
      </div>
    </div>
  );
}

export default Header;
