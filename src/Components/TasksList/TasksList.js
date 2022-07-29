import Task from "./Task/Task";
import PropTypes from "prop-types";

import "./TasksList.scss";

export default function TasksList({
  tasksList,
  handleEditClick,
  deleteTask,
  changeTaskStatus,
}) {
  return (
    <>
      <table className="tasks-list">
        <thead className="tasks-list__header">
          <tr className="tasks-list_row">
            <th className="tasks-list__header__title">ID</th>
            <th className="tasks-list__header__title">Created at</th>
            <th className="tasks-list__header__title">Created By</th>
            <th className="tasks-list__header__title">Title</th>
            <th className="tasks-list__header__title">Description</th>
            <th className="tasks-list__header__title">Priority</th>
            <th className="tasks-list__header__title">Completed</th>
            <th className="tasks-list__header__title">Completed at</th>
          </tr>
        </thead>
        <tbody className="tasks-list__body">
          {tasksList.map((task) => {
            return (
              <tr key={task.id + "-" + task.title} className="tasks-list__row">
                <Task
                  task={task}
                  handleEditClick={handleEditClick}
                  deleteTask={deleteTask}
                  changeTaskStatus={changeTaskStatus}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

TasksList.defaultProps = {
  tasksList: [],
};

Task.propTypes = {
  tasksList: PropTypes.array,
};
