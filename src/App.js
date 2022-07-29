import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";
import "moment-timezone";
import "./App.scss";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import TaskList from "./components/TaskList/TaskList";
import AddTask from "./components/AddTask/AddTask";
import EditTask from "./components/EditTask/EditTask";

function App() {
  const [task, setTask] = useState({
    id: null,
    createdAt: null,
    createdBy: "Ana",
    title: "",
    description: "",
    priority: "",
    completed: false,
    completedAt: null,
  });

  const getTaskListFromLocalStorage = () => {
    const savedList = localStorage.getItem("taskList");
    const initialTaskList = JSON.parse(savedList);
    return initialTaskList || [];
  };

  const [taskList, setTaskList] = useState(getTaskListFromLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskItem, setCurrentTaskItem] = useState({});

  const addNewTask = (title, description, priority) => {
    const newTask = {
      id: uuidv4(),
      createdAt: moment().format("lll"),
      createdBy: "Ana",
      title: title,
      description: description,
      priority: priority,
      completed: false,
      completedAt: null,
    };
    setTaskList([...taskList, newTask]);
  };

  const editTask = (taskId, updatedTask) => {
    const updatedList = taskList.map((task) => {
      if (task.id === taskId) {
        task.title = updatedTask.title;
        task.description = updatedTask.description;
        task.priority = updatedTask.priority;
      }
      return task;
    });
    setTaskList(updatedList);
    setIsEditing(false);
  };

  const deleteTask = (taskId) => {
    setTaskList([...taskList.filter((task) => task.id !== taskId)]);
  };

  const handleEditClick = (task) => {
    setIsEditing(true);
    setCurrentTaskItem({ ...task });
  };

  const changeTaskStatus = (taskId) => {
    setTaskList((prevState) =>
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
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <div className="task-manager">
      <Header />
      <div className="task-manager__body">
        <div className="task-manager__body__left-column">
          <Navbar />
        </div>
        <div className="task-manager__body__right-column">
          <AddTask task={task} setTask={setTask} addNewTask={addNewTask} />
          <TaskList
            taskList={taskList}
            setTaskList={setTaskList}
            handleEditClick={handleEditClick}
            deleteTask={deleteTask}
            changeTaskStatus={changeTaskStatus}
          />
          {isEditing && (
            <EditTask
              currentTaskItem={currentTaskItem}
              setCurrentTaskItem={setCurrentTaskItem}
              editTask={editTask}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
