import React, { useState } from "react";
import PropTypes from "prop-types";

import { FaPlusCircle } from "react-icons/fa";
import "./AddTask.scss";

function AddTask({ task, setTask, addNewTask }) {
  const [warning, setWarning] = useState(false);

  const onChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title && task.description && task.priority) {
      setWarning(false);
      addNewTask(task.title, task.description, task.priority);
      setTask({ id: "", title: "", description: "", priority: "" });
    } else {
      setWarning(true);
    }
  };

  return (
    <>
      <form className="task-input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={task.title}
          name="title"
          placeholder="Add title.."
          className="task-input-container__input-text"
          onChange={onChange}
        ></input>
        <input
          type="text"
          value={task.description}
          name="description"
          placeholder="Add description.."
          className="task-input-container__input-text"
          onChange={onChange}
        ></input>
        <select
          name="priority"
          className="task-input-container__input-text"
          value={task.priority}
          onChange={onChange}
        >
          <option value="0">Select priority...</option>
          <option value="1">High</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </select>
        <button className="task-input-container__submit-button">
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
