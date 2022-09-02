import React, { useContext, useMemo } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function ThemeSwitcher() {
  const { darkMode, changeTheme } = useContext(ThemeContext);

  const themeStyles = useMemo(() => {
    return {
      backgroundColor: darkMode ? "hsl(0,0%,10%)" : "hsl(0,0%,90%)",
      border: "none",
      color: darkMode ? "hsl(0,0%,90%)" : "hsl(0,0%,10%)",
      cursor: "pointer",
    };
  }, [darkMode]);

  return (
    <button type="button" onClick={changeTheme} style={themeStyles}>
      {darkMode ? <LightModeIcon /> : <ModeNightIcon />}
    </button>
  );
}
