import { useNavigate } from "react-router";
import { FaTrash, FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";
import moment from "moment-timezone";

import "./Task.scss";

const Task = ({ task, tasksList, setTasksList }) => {
  const navigate = useNavigate();

  const changeTaskStatus = (taskId) => {
    if (taskId) {
      const newTasksList = [...tasksList];
      const currentTaskIndex = newTasksList.findIndex(
        (task) => task.id === taskId
      );
      newTasksList[currentTaskIndex].completed =
        !tasksList[currentTaskIndex].completed;
      newTasksList[currentTaskIndex].completedAt = newTasksList[
        currentTaskIndex
      ].completed
        ? moment().format("lll")
        : "";
      setTasksList(newTasksList);
    }
  };

  const handleEditClick = (taskId) => {
    if (taskId) {
      navigate(`/edit-task/${taskId}`);
    }
  };

  const deleteTask = (taskId) => {
    if (taskId) {
      setTasksList([...tasksList.filter((task) => task.id !== taskId)]);
    }
  };

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

      <td>{task.completedAt}</td>

      <td>
        <button
          className="task__editButton"
          onClick={() => handleEditClick(task.id)}
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
};

Task.defaultProps = {
  task: {
    createdBy: "Ana",
  },
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    createAt: PropTypes.instanceOf(Date),
    createdBy: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.number,
    completed: PropTypes.bool,
    completedAt: PropTypes.instanceOf(Date),
  }),

  tasksList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      createAt: PropTypes.instanceOf(Date),
      createdBy: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      priority: PropTypes.number,
      completed: PropTypes.bool,
      completedAt: PropTypes.instanceOf(Date),
    })
  ),
  setTasksList: PropTypes.func,
};

export default Task;
