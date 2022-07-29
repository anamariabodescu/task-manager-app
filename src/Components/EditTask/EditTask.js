import React from "react";

export default function EditTask({
  currentTaskItem,
  setCurrentTaskItem,
  editTask,
}) {
  console.log(currentTaskItem);

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    editTask(currentTaskItem.id, currentTaskItem);
  };

  const handleInputChange = (e) => {
    setCurrentTaskItem({
      ...currentTaskItem,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="task-input-container" onSubmit={handleEditFormSubmit}>
      <input
        type="text"
        value={currentTaskItem.title}
        name="title"
        placeholder="Add title.."
        className="task-input-container__input-text"
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        value={currentTaskItem.description}
        name="description"
        placeholder="Add description.."
        className="task-input-container__input-text"
        onChange={handleInputChange}
      ></input>
      <select
        name="priority"
        className="task-input-container__input-text"
        value={currentTaskItem.priority}
        onChange={handleInputChange}
      >
        <option value="1">High</option>
        <option value="2">Medium</option>
        <option value="3">Low</option>
      </select>
      <button type="submit" className="task-input-container__submit-button">
        Update
      </button>
    </form>
  );
}
