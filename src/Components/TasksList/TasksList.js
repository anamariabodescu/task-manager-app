import { useState } from "react";
import Task from "./Task/Task";
import PropTypes from "prop-types";
import { BsSearch } from "react-icons/bs";

import "./TasksList.scss";

export default function TasksList({
  tasksList,
  handleEditClick,
  deleteTask,
  changeTaskStatus,
}) {
  const [filteredList, setFilteredList] = useState(tasksList);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.target.value ? setSearch(e.target.value) : setFilteredList(tasksList);
  };

  const handleFilterChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "all") {
      setFilteredList(tasksList);
    } else {
      e.target.value === "completed" ? setSearch(false) : setSearch(true);
      displayFilterResult();
    }
  };

  const displaySearchResult = () => {
    const filteredList = tasksList.filter(
      (task) =>
        task.description.includes(search) ||
        task.title.includes(search) ||
        task.createdBy.includes(search)
    );
    setFilteredList(filteredList);
  };

  const displayFilterResult = () => {
    const filteredList = tasksList.filter((task) => task.completed === search);
    setFilteredList(filteredList);
  };

  return (
    <div className="tasks-list">
      <div className="tasks-list__bars">
        <div className="tasks-list__bars__search-bar">
          <input
            type="text"
            placeholder="Serach.."
            className="tasks-list__bars__search-bar__search-input"
            onChange={handleSearch}
          />
          <button
            className="tasks-list__bars__search-bar__search-btn"
            onClick={displaySearchResult}
          >
            <BsSearch />
          </button>
        </div>
        <div className="tasks-list__bars__filter-bar">
          <select name="filter-list" onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
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
          {filteredList.map((task) => {
            return (
              <tr
                key={task.id + "-" + task.title}
                className="tasks-list__table__row"
              >
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
    </div>
  );
}

Task.propTypes = {
  tasksList: PropTypes.array,
  handleEditClick: PropTypes.func,
  deleteTask: PropTypes.func,
  changeTaskStatus: PropTypes.func,
};
