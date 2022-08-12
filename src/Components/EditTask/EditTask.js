import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getTasksList, updateTask } from "../../service";

const DEFAULT_TASK = {
  id: null,
  createAt: null,
  createdBy: "Ana",
  title: "",
  description: "",
  priority: "",
  completed: false,
  completedAt: null,
};

const EditTask = ({ tasksList, setTasksList }) => {
  const [task, setTask] = useState(DEFAULT_TASK);
  const { taskId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = () => {
    updateTasksList(task);
  };

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const updateTasksList = (updatedTask) => {
    if (updatedTask) {
      updateTask(updatedTask)
        .then(() => getTasksList())
        .then((tasksList) => setTasksList(tasksList));
    }
    navigate("/task-list");
  };

  useEffect(() => {
    if (taskId) {
      const currentTask = tasksList.find((task) => task.id === taskId);
      setTask(currentTask);
    }
  }, [taskId, tasksList]);

  return (
    <div className="task-form">
      <input
        type="text"
        value={task.title}
        name="title"
        placeholder="Add title.."
        className="task-form__input-text"
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        value={task.description}
        name="description"
        placeholder="Add description.."
        className="task-form__input-text"
        onChange={handleInputChange}
      ></input>
      <select
        name="priority"
        className="task-form__input-text"
        value={task.priority}
        onChange={handleInputChange}
      >
        <option value="1">High</option>
        <option value="2">Medium</option>
        <option value="3">Low</option>
      </select>
      <button
        type="submit"
        className="task-form__submit-button"
        onClick={handleSubmit}
      >
        Update
      </button>
    </div>
  );
};

EditTask.propTypes = {
  tasksList: PropTypes.array,
  setTasksList: PropTypes.func,
};

export default EditTask;
