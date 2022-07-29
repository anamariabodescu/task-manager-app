import React from "react";

export default function ThemeSwitcher() {
  const switchTheme = () => {
    console.log("theme switched");
  };

  return (
    <div>
      <button type="button" onClick={switchTheme}>
        Change
      </button>
    </div>
  );
}
