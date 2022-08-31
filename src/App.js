import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import TasksList from "./components/TasksList/TasksList";
import AddTask from "./components/AddTask/AddTask";
import EditTask from "./components/EditTask/EditTask";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import "./App.scss";

const App = () => {
  return (
    <>
      <div className="task-manager">
        <Navbar />
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
    </>
  );
};

export default App;
