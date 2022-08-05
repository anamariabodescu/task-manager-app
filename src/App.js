import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import TasksList from "./components/TasksList/TasksList";
import AddTask from "./components/AddTask/AddTask";
import EditTask from "./components/EditTask/EditTask";
import ErrorPage from "./components/ErrorPage/ErrorPage";

import "./App.scss";

const getTasksListFromLocalStorage = () => {
  let savedList = [];
  let initialTasksList = [];
  if (localStorage) {
    savedList = localStorage.getItem("tasksList");
    try {
      initialTasksList = JSON.parse(savedList);
    } catch (error) {
      console.log(error);
    }
  }
  return initialTasksList;
};

const INITIAL_TASKS_LIST = getTasksListFromLocalStorage();

const App = () => {
  const [tasksList, setTasksList] = useState(INITIAL_TASKS_LIST);

  useEffect(() => {
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
  }, [tasksList]);

  return (
    <>
      <div className="task-manager">
        <Header />
        <div className="task-manager__body">
          <div className="task-manager__body__left-column">
            <Navbar />
          </div>
          <div className="task-manager__body__right-column">
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
                  <TasksList
                    tasksList={tasksList}
                    setTasksList={setTasksList}
                  />
                }
              ></Route>
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
