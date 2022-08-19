import { useState } from "react";
import PropTypes from "prop-types";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Task from "./Task/Task";
import "./TasksList.scss";

const FILTERS = [
  {
    value: 0,
    label: "All",
  },
  {
    value: 1,
    label: "Completed",
  },
  {
    value: 2,
    label: "Uncompleted",
  },
];

const TasksList = ({ tasksList, setTasksList }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState(FILTERS[0].value);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const onSearchKeywordChange = (e) => {
    setSearchKeyword(e.target.value.toLowerCase());
  };

  const onStatusFilterChange = (e) => {
    setStatusFilter(Number(e.target.value));
  };

  const searchFilterFunction = (task) => {
    let filterFound = true;
    let keywordFound = true;
    if (statusFilter === 2 && task.completed) {
      filterFound = false;
    }
    if (statusFilter === 1 && !task.completed) {
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <div className="tasks-list__bars">
        <div className="tasks-list__bars__filter-bar">
          <FormControl fullWidth margin="normal">
            <InputLabel id="task-filter">Filter</InputLabel>
            <Select
              label="Filter"
              labelId="task-filter"
              name="priority"
              defaultValue={statusFilter}
              onChange={onStatusFilterChange}
              size="small"
              sx={{ width: 160 }}
            >
              {FILTERS.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="tasks-list__bars__search-bar">
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            onChange={onSearchKeywordChange}
            placeholder="Search task"
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>
      </div>

      <TableContainer sx={{ maxHeight: 840 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell>Completed At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasksList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .filter(searchFilterFunction)
              .map((task) => {
                return (
                  <TableRow hover key={`${task.id}+${task.title}`}>
                    <Task
                      task={task}
                      tasksList={tasksList}
                      setTasksList={setTasksList}
                    />
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={tasksList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

Task.propTypes = {
  tasksList: PropTypes.array,
  setTasksList: PropTypes.func,
};

export default TasksList;
