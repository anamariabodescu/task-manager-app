import PropTypes from "prop-types";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./Task.scss";

export default function Task({
  task,
  handleEditClick,
  deleteTask,
  changeTaskStatus,
}) {
  return (
    <>
      <td>{task.id}</td>
      <td>{task.createdAt}</td>
      <td>{task.createdBy}</td>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.priority}</td>
      <td>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => changeTaskStatus(task.id)}
        ></input>
      </td>

      <td>{task.compltetedAt}</td>

      <td>
        <button
          className="task__editButton"
          onClick={() => handleEditClick(task)}
        >
          <FaEdit />
        </button>
      </td>
      <td>
        <button
          className="task__deleteButton"
          onClick={() => deleteTask(task.id)}
        >
          <FaTrash />
        </button>
      </td>
    </>
  );
}

Task.defaultProps = {
  TaskItem: {
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

Task.propTypes = {
  task: PropTypes.object,
};
