import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import moment from "moment-timezone";

import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import TasksList from "./components/TasksList/TasksList";
import AddTask from "./components/AddTask/AddTask";
import EditTask from "./components/EditTask/EditTask";
import ErrorPage from "./components/ErrorPage/ErrorPage";

import "./App.scss";

function App() {
  const getTasksListFromLocalStorage = () => {
    const savedList = localStorage.getItem("tasksList");
    const initialtasksList = JSON.parse(savedList);
    return initialtasksList || [];
  };

  const [tasksList, setTasksList] = useState(getTasksListFromLocalStorage());
  const [currentTask, setCurrentTask] = useState({});
  const navigate = useNavigate();

  const addNewTask = (newTask) => {
    setTasksList([...tasksList, newTask]);
  };

  const updateTasksList = (updatedTask) => {
    const updatedList = tasksList.map((task) => {
      if (task.id === updatedTask.id) {
        task.title = updatedTask.title;
        task.description = updatedTask.description;
        task.priority = updatedTask.priority;
      }
      return task;
    });
    setTasksList(updatedList);
    navigate("/task-list");
  };

  const deleteTask = (taskId) => {
    setTasksList([...tasksList.filter((task) => task.id !== taskId)]);
  };

  const handleEditClick = (task) => {
    setCurrentTask({ ...task });
    navigate("/edit-task/" + task.id);
  };

  const changeTaskStatus = (taskId) => {
    setTasksList((prevState) =>
      prevState.map((task) => {
        if (task.id === taskId) {
          return task.completed
            ? { ...task, completed: false, completedAt: null }
            : {
                ...task,
                completed: true,
                completedAt: moment().format("lll"),
              };
        }
        return task;
      })
    );
  };

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
              <Route path="/" element={<AddTask addNewTask={addNewTask} />} />
              <Route
                path="/task-list"
                element={
                  <TasksList
                    tasksList={tasksList}
                    changeTaskStatus={changeTaskStatus}
                    handleEditClick={handleEditClick}
                    deleteTask={deleteTask}
                  />
                }
              />
              <Route
                path="/edit-task/:taskId"
                element={
                  <EditTask
                    currentTask={currentTask}
                    setCurrentTask={setCurrentTask}
                    updateTasksList={updateTasksList}
                  />
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
