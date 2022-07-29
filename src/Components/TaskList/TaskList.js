import TaskItem from "./TaskItem/TaskItem";
import PropTypes from "prop-types";

import "./TaskList.scss";

export default function TaskList({
  taskList,
  setTaskList,
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
          {taskList.map((taskItem) => {
            return (
              <tr
                key={taskItem.id + "-" + taskItem.title}
                className="tasks-list__row"
              >
                <TaskItem
                  taskItem={taskItem}
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

TaskList.defaultProps = {
  taskList: [],
};

TaskItem.propTypes = {
  taskList: PropTypes.array,
};
