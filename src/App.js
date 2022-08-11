import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import TasksList from "./components/TasksList/TasksList";
import AddTask from "./components/AddTask/AddTask";
import EditTask from "./components/EditTask/EditTask";
import ErrorPage from "./components/ErrorPage/ErrorPage";

import "./App.scss";

const App = () => {
  const [tasksList, setTasksList] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch the data for that resource.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTasksList(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("tasksList", JSON.stringify(tasksList));
  // }, [tasksList]);

  return (
    <>
      <div className="task-manager">
        <Header />
        <div className="task-manager__body">
          <div className="task-manager__body__left-column">
            <Navbar />
          </div>
          <div className="task-manager__body__right-column">
            {error && <div>{error}</div>}
            {loading && <div>Loading...</div>}
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
