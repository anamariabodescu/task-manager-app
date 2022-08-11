import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import PropTypes from "prop-types";

import Task from "./Task/Task";

import "./TasksList.scss";

const STATUS_FILTER_DIC = {
  ALL: 0,
  COMPLETED: 1,
  UNCOMPLETED: 2,
};

const TasksList = ({ tasksList, setTasksList }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState(STATUS_FILTER_DIC["ALL"]);

  const onSearchKeywordChange = (e) => {
    setSearchKeyword(e.target.value.toLowerCase());
  };

  const onStatusFilterChange = (e) => {
    setStatusFilter(Number(e.target.value));
  };

  const searchFilterFunction = (task) => {
    let filterFound = true;
    let keywordFound = true;

    if (statusFilter === STATUS_FILTER_DIC["UNCOMPLETED"] && task.completed) {
      filterFound = false;
    }
    if (statusFilter === STATUS_FILTER_DIC["COMPLETED"] && !task.completed) {
      filterFound = false;
    }

    if (
      task.description.toLowerCase().includes(searchKeyword) ||
      task.title.toLowerCase().includes(searchKeyword) ||
      task.createdBy.toLowerCase().includes(searchKeyword)
    ) {
      keywordFound = true;
    } else {
      keywordFound = false;
    }

    return keywordFound && filterFound;
  };

  return (
    <div className="tasks-list">
      <div className="tasks-list__bars">
        <div className="tasks-list__bars__search-bar">
          <input
            type="text"
            placeholder="Serach.."
            className="tasks-list__bars__search-bar__search-input"
            onChange={onSearchKeywordChange}
          />
          <button className="tasks-list__bars__search-bar__search-btn">
            <BsSearch />
          </button>
        </div>
        <div className="tasks-list__bars__filter-bar">
          <select
            name="filter-list"
            onChange={onStatusFilterChange}
            defaultValue={STATUS_FILTER_DIC["ALL"]}
          >
            <option value={STATUS_FILTER_DIC["ALL"]}>All</option>
            <option value={STATUS_FILTER_DIC["COMPLETED"]}>Completed</option>
            <option value={STATUS_FILTER_DIC["UNCOMPLETED"]}>
              Uncompleted
            </option>
          </select>
        </div>
      </div>

      <table className="tasks-list__table">
        <thead className="tasks-list__table__header">
          <tr className="tasks-list__tablet_row">
            <th className="tasks-list__table__header__title">ID</th>
            <th className="tasks-list__table__header__title">Created at</th>
            <th className="tasks-list__table__header__title">Created By</th>
            <th className="tasks-list__table__header__title">Title</th>
            <th className="tasks-list__table__header__title">Description</th>
            <th className="tasks-list__table__header__title">Priority</th>
            <th className="tasks-list__table__header__title">Completed</th>
            <th className="tasks-list__table__header__title">Completed at</th>
          </tr>
        </thead>
        <tbody className="tasks-list__table__body">
          {tasksList.filter(searchFilterFunction).map((task) => {
            return (
              <tr
                key={`${task.id}+${task.title}`}
                className="tasks-list__table__row"
              >
                <Task
                  task={task}
                  tasksList={tasksList}
                  setTasksList={setTasksList}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Task.propTypes = {
  tasksList: PropTypes.array,
  setTasksList: PropTypes.func,
};

export default TasksList;
