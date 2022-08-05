import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import moment from "moment-timezone";

import "./AddTask.scss";

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

const AddTask = ({ tasksList, setTasksList }) => {
  const [task, setTask] = useState(DEFAULT_TASK);
  const [warning, setWarning] = useState(false);

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (task.title && task.description && task.priority) {
      const newTask = {
        id: uuidv4(),
        createdAt: moment().format("lll"),
        createdBy: "Ana",
        title: task.title,
        description: task.description,
        priority: task.priority,
        completed: false,
        completedAt: null,
      };
      setWarning(false);
      addNewTask(newTask);
      setTask({ title: "", description: "", priority: "" });
    } else {
      setWarning(true);
    }
  };

  const addNewTask = (newTask) => {
    setTasksList([...tasksList, newTask]);
  };

  return (
    <>
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
          <option value="0">Select priority...</option>
          <option value="1">High</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </select>
        <button className="task-form__submit-button" onClick={handleSubmit}>
          <FaPlusCircle />
        </button>
      </div>
      {warning && <h3 className="warning">You must fill all the fields</h3>}
    </>
  );
};

AddTask.propTypes = {
  tasksList: PropTypes.array,
  setTasksList: PropTypes.func,
};

export default AddTask;
