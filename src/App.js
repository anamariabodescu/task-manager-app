import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import moment from "moment-timezone";

import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import TasksList from "./Components/TasksList/TasksList";
import AddTask from "./Components/AddTask/AddTask";
import EditTask from "./Components/EditTask/EditTask";
import ErrorPage from "./Components/ErrorPage/ErrorPage";

import "./App.scss";

const DEFAULT_TASK = {
  id: null,
  createdAt: null,
  createdBy: "Ana",
  title: "",
  description: "",
  priority: "",
  completed: false,
  completedAt: null,
};

const App = () => {
  const getTasksListFromLocalStorage = () => {
    // if(localStorage){

    // }
    const savedList = localStorage.getItem("tasksList"); // string
    let initialtasksList = [];
    try {
      initialtasksList = JSON.parse(savedList);
    } catch (error) {
      return [];
    }
    return initialtasksList;
  };

  const [tasksList, setTasksList] = useState(getTasksListFromLocalStorage());
  const [task, setTask] = useState(DEFAULT_TASK); // mutat in Add Task

  const navigate = useNavigate();
  // const history = useHistory(); history.push(newLocation)

  const addNewTask = (newTask) => {
    setTasksList((prevState) => [...prevState, newTask]);
  };

  const updateTasksList = (updatedTask) => {
    const updatedList = tasksList.map((task) => {
      if (task.id === updatedTask.id) {
        // return {
        //   title: updatedTask.title,
        //   description: updatedTask.description,
        //   priority: updatedTask.priority
        // }

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
    setTasksList((prevState) => [...prevState.filter((task) => task.id !== taskId)]);
  };

  const handleEditClick = (task) => {
    navigate(`/edit-task/${task.id}`);
  };

  const changeTaskStatus = (taskId) => {
    // if(taskId)
    // const newTaskList = [...taskList]
    // const currentTaskIndex = newTaskList.findIndex(task =>task.id === taskId)
    // newTaskList[currentTaskIndex].comel
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


  console.log(tasksList);
  return (

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
                <AddTask
                  task={task} // nu ne trebuie
                  setTask={setTask} // nu ne trebuie
                  addNewTask={addNewTask}
                />
              }
            />
            <Route
              path="/task-list"
              element={
                <TasksList
                  tasksList={tasksList}
                  //setTaskList={setTaskList}
                  changeTaskStatus={changeTaskStatus} // muta mai jos
                  handleEditClick={handleEditClick} // nu ne trebuie, muta mai jos
                  deleteTask={deleteTask}  // muta mai jos
                />
              }
            />
            <Route
              path="/edit-task/:taskId"
              element={
                <EditTask
                  tasksList={tasksList}
                  task={task} // nu ne mai trebuie, il recuperam 
                  setTask={setTask}
                  updateTasksList={updateTasksList}
                />
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
