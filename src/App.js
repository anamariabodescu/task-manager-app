import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import useFetch from "./useFetch";
import Navbar from "./components/Navbar/Navbar";
import TasksList from "./components/TasksList/TasksList";
import AddTask from "./components/AddTask/AddTask";
import EditTask from "./components/EditTask/EditTask";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./App.scss";
import { getTasksList } from "./service";

const URL = "http://localhost:8000/tasks";

const App = () => {
  // const { data, isLoading, error } = useFetch(URL);
  const [tasksList, setTasksList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getTasksList()
      .then((tasksList) => setTasksList(tasksList))
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <>
      <div className="task-manager">
        <Navbar />
        <div className="task-manager__body">
          <div className="task-manager__body__right-column">
            {loading && (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            )}

            {error && <div>Tasks list fetch failed</div>}
            <Routes>
              <Route
                path="/"
                element={
                  <AddTask tasksList={tasksList} setTasksList={setTasksList} />
                }
              />
              <Route
                path="/task-list"
                element={
                  tasksList && (
                    <TasksList
                      tasksList={tasksList}
                      setTasksList={setTasksList}
                    />
                  )
                }
              />
              <Route
                path="/edit-task/:taskId"
                element={
                  <EditTask tasksList={tasksList} setTasksList={setTasksList} />
                }
              ></Route>
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
