import { useEffect, useState } from "react";
import Task from "./Task/Task";
import PropTypes from "prop-types";
import { BsSearch } from "react-icons/bs";

import "./TasksList.scss";


export default function TasksList({
  tasksList,
  // setTaskList
  handleEditClick, //
  deleteTask, //
  changeTaskStatus, //
}) {
  const [filteredList, setFilteredList] = useState(tasksList); // not needed anymore
  const [search, setSearch] = useState(""); //searchKeyword
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState('all'); // all, completed, uncompleted

  const onSearchKeywordChange = (e) => {
    setSearchKeyword(e.target.value.toLowerCase());
  }

  const onStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  }

  // useEffect(() => {

  // }, [searchKeyword])

  const handleSearch = (e) => {
    e.target.value ? setSearch(e.target.value) : setFilteredList(tasksList);
  };

  const handleFilterChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "all") {
      setFilteredList(tasksList);
    } else {
      if (e.target.value === "completed") {
        setSearch(false);
      } else {
        setSearch(true);
      }
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

  const searchFilterFunction = (task) => {
    let isValid = true;

    if (statusFilter !== 'all') {
      if (statusFilter === 'uncompleted' && task.completed) {
        isValid = false;
      } else if (statusFilter === 'completed' && !task.completed) {
        isValid = false;
      } else {
        isValid = true;
      }
    }

    if (isValid) {
      if (task.description.toLowerCase().includes(searchKeyword) ||
        task.title.toLowerCase().includes(searchKeyword) ||
        task.createdBy.toLowerCase().includes(searchKeyword)) {
        isValid = true
      } else {
        isValid = false;
      }
    }

    return isValid;
  }

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
            onChange={onSearchKeywordChange}
          />
          <button
            className="tasks-list__bars__search-bar__search-btn"
            onClick={displaySearchResult}
          >
            <BsSearch />
          </button>
        </div>
        <div className="tasks-list__bars__filter-bar">
          <select
            name="filter-list"
            onChange={onStatusFilterChange}
            defaultValue="all"
          >
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

          {tasksList.filter(searchFilterFunction).map((task) => {
            return (
              <tr
                key={task.id + "-" + task.title} // use literal strings please
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

          {/* {filteredList.map((task) => {
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
          })} */}
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
