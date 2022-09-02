import React, { createContext, useState } from "react";

const ThemeContext = createContext(false);

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const changeTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
