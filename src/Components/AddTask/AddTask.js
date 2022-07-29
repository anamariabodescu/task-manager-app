import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";
import PropTypes from "prop-types";
import { FaPlusCircle } from "react-icons/fa";
import "moment-timezone";
import "./AddTask.scss";

function AddTask({ addNewTask }) {
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

  const [warning, setWarning] = useState(false);

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      setTask({ id: "", title: "", description: "", priority: "" });
    } else {
      setWarning(true);
    }
  };

  return (
    <>
      <form className="task-form" onSubmit={handleSubmit}>
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
        <button className="task-form__submit-button">
          <FaPlusCircle />
        </button>
      </form>
      {warning && <h3 className="warning">You must fill all the fields</h3>}
    </>
  );
}

AddTask.defaultProps = {
  task: {
    id: "",
    createdAt: null,
    createdBy: "Ana",
    title: "",
    description: "",
    priority: null,
    completed: false,
    completedAt: null,
  },
};

AddTask.propTypes = {
  task: PropTypes.object,
  setTask: PropTypes.func,
  addNewTask: PropTypes.func,
};

export default AddTask;
