import { useNavigate } from "react-router";
import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TableCell from "@mui/material/TableCell";
import LoadingButton from "@mui/lab/LoadingButton";
import UserMessage from "../../UserMeesage/UserMessage";
import { getTasksList, updateTask, removeTask } from "../../../service";
import "./Task.scss";

const Task = ({ task, tasksList, setTasksList }) => {
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);
  const [status, setStatus] = useState();

  const navigate = useNavigate();

  const updateTaskStatus = (taskId) => {
    setOpenAlert(true);
    setLoading(true);
    setStatus();

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

      updateTask(newTasksList[currentTaskIndex])
        .then(() => getTasksList())
        .then((tasksList) => setTasksList(tasksList))
        .then(() => setLoading(false))
        .catch(() => {
          setStatus({ type: "error" });
          setLoading(false);
        });
    }
  };

  const handleEditClick = (taskId) => {
    if (taskId) {
      navigate(`/edit-task/${taskId}`);
    }
  };

  const deleteTask = (taskId) => {
    setOpenAlert(true);
    setLoading(true);
    setStatus();

    if (taskId) {
      removeTask(taskId)
        .then(() => getTasksList())
        .then((tasksList) => setTasksList(tasksList))
        .then(() => setStatus({ type: "success" }))
        .then(() => setLoading(false))
        .catch(() => {
          setStatus({ type: "error" });
          setLoading(false);
        });
    }
  };

  return (
    <>
      <TableCell>{task.id}</TableCell>
      <TableCell>{moment(task.createdAt).format("lll")}</TableCell>
      <TableCell>{task.createdBy}</TableCell>
      <TableCell>{task.title}</TableCell>
      <TableCell>{task.description}</TableCell>
      <TableCell>{task.priority}</TableCell>
      <TableCell>
        <Checkbox
          checked={task.completed}
          onChange={() => updateTaskStatus(task.id)}
        />
      </TableCell>
      <TableCell>
        {task.completedAt && moment(task.completedAt).format("lll")}
      </TableCell>
      <TableCell>
        <ButtonGroup>
          <Button
            variant="contained"
            endIcon={<EditIcon />}
            onClick={() => handleEditClick(task.id)}
            size="small"
            className="task__editButton"
          >
            Edit
          </Button>
          <LoadingButton
            variant="outlined"
            endIcon={<DeleteIcon />}
            onClick={() => deleteTask(task.id)}
            size="small"
            className="task__deleteButton"
            loading={loading}
          >
            Delete
          </LoadingButton>
        </ButtonGroup>
      </TableCell>

      {status?.type === "success" && (
        <UserMessage
          type={status.type}
          message={"Task successfully deleted"}
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
        ></UserMessage>
      )}

      {status?.type === "error" && (
        <UserMessage
          type={status.type}
          message={"Task couldn't be deleted"}
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
        ></UserMessage>
      )}
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
      id: PropTypes.string,
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
