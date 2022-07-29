import React from "react";
import PropTypes from "prop-types";

export default function EditTask({
  currentTask,
  setCurrentTask,
  updateTasksList,
}) {
  console.log(currentTask);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateTasksList(currentTask);
  };

  const handleInputChange = (e) => {
    setCurrentTask({
      ...currentTask,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="task-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={currentTask.title}
        name="title"
        placeholder="Add title.."
        className="task-form__input-text"
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        value={currentTask.description}
        name="description"
        placeholder="Add description.."
        className="task-form__input-text"
        onChange={handleInputChange}
      ></input>
      <select
        name="priority"
        className="task-form__input-text"
        value={currentTask.priority}
        onChange={handleInputChange}
      >
        <option value="1">High</option>
        <option value="2">Medium</option>
        <option value="3">Low</option>
      </select>
      <button type="submit" className="task-form__submit-button">
        Update
      </button>
    </form>
  );
}

EditTask.defaultProps = {
  task: {
    createdBy: "Ana",
  },
};

EditTask.propTypes = {
  currentTask: PropTypes.object,
  setCurrentTask: PropTypes.func,
  updateTasksList: PropTypes.func,
};
