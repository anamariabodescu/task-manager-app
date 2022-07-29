import PropTypes from "prop-types";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./TaskItem.scss";

export default function TaskItem({
  taskItem,
  handleEditClick,
  deleteTask,
  changeTaskStatus,
}) {
  return (
    <>
      <td className="taskItem">{taskItem.id}</td>
      <td>{taskItem.createdAt}</td>
      <td>{taskItem.createdBy}</td>
      <td>{taskItem.title}</td>
      <td>{taskItem.description}</td>
      <td>{taskItem.priority}</td>
      <td>
        {" "}
        <input
          type="checkbox"
          checked={taskItem.completed}
          onChange={() => changeTaskStatus(taskItem.id)}
        ></input>
      </td>

      <td>{taskItem.compltetedAt}</td>

      <td>
        <button
          className="taskItem__editTaskButton"
          onClick={() => handleEditClick(taskItem)}
        >
          <FaEdit />
        </button>
      </td>
      <td>
        <button
          className="taskItem__deteleTaskButton"
          onClick={() => deleteTask(taskItem.id)}
        >
          <FaTrash />
        </button>
      </td>
    </>
  );
}

TaskItem.defaultProps = {
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

TaskItem.propTypes = {
  task: PropTypes.object,
};
