import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

export default function EditTask({
  tasksList,
  task, // not needed {}
  setTask, // not needed
  updateTasksList,
}) {
  const { taskId } = useParams();
  // [task, setTask] = useState(DEFAULT_TASK)

  useEffect(() => {
    if(taskId){
      const currentTask = tasksList.find(task => task.id === taskId)
      setTask(currentTask);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateTasksList(task);
  };

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setTask(tasksList.filter((task) => task.id === taskId)[0]);
  }, []); // to be removed

  // change form to div, add onClick pe buton
  return (
    <form className="task-form" onSubmit={handleFormSubmit}>
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
  tasksList: PropTypes.array,
  task: PropTypes.object, // {} define shape
  setTask: PropTypes.func,
  updateTasksList: PropTypes.func,
};
