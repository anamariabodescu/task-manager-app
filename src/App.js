import { Routes, Route } from "react-router-dom";
import { useContext, useMemo } from "react";
import { ThemeContext } from "./context/ThemeContext";

import Navbar from "./components/Navbar/Navbar";
import TasksList from "./components/TasksList/TasksList";
import AddTask from "./components/AddTask/AddTask";
import EditTask from "./components/EditTask/EditTask";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";

import "./App.scss";
import "./components/Navbar/Navbar.scss";

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const themeStyles = useMemo(() => {
    return {
      backgroundColor: darkMode ? "hsl(0,0%,10%)" : "hsl(0,0%,90%)",
      color: darkMode ? "hsl(0,0%,10%)" : "hsl(0,0%,90%)",
    };
  }, [darkMode]);

  return (
    <div style={themeStyles} className="task-manager dark">
      <Navbar style={themeStyles} />
      <ThemeSwitcher />
      <div className="task-manager__body">
        <div className="task-manager__body__right-column">
          <Routes>
            <Route path="/" element={<AddTask />} />
            <Route path="/task-list" element={<TasksList />} />
            <Route path="/edit-task/:taskId" element={<EditTask />}></Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
