import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getTasksList, updateTask } from "../../service";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

const DEFAULT_TASK = {
  id: null,
  createAt: null,
  createdBy: "Ana",
  title: "",
  description: "",
  priority: "",
  completed: false,
  completedAt: null,
};

const EditTask = ({ tasksList, setTasksList }) => {
  const [task, setTask] = useState(DEFAULT_TASK);
  const [status, setStatus] = useState();
  const [openAlert, setOpenAlert] = useState(true);
  const [loading, setLoading] = useState(false);
  const { taskId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setOpenAlert(true);
    setLoading(true);
    if (task.title && task.description && task.priority) {
      updateTasksList(task);
    } else {
      setStatus({ type: "warning" });
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const updateTasksList = (updatedTask) => {
    if (updatedTask) {
      updateTask(updatedTask)
        .then(() => getTasksList())
        .then((tasksList) => setTasksList(tasksList))
        .then(() => setStatus({ type: "success" }))
        .then(() => setLoading(false))
        .then(() => navigate("/task-list"))
        .catch((error) => {
          setOpenAlert(true);
          setLoading(false);
          setStatus({ type: "error" });
        });
    } else {
      setOpenAlert(true);
      setStatus({ type: "error" });
    }
  };
  const handleClose = (event, reason) => {
    setOpenAlert(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const displayMeesageAlert = (type, message) => {
    return (
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleClose}
        action={action}
      >
        <Alert
          multiple
          onClose={handleClose}
          severity={type}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    );
  };

  useEffect(() => {
    if (taskId) {
      const currentTask = tasksList.find((task) => task.id === taskId);
      setTask(currentTask);
    }
  }, [taskId, tasksList]);

  return (
    <>
      <div className="task-form">
        <div className="task-form__title">
          <div className="task-form__title__edit-task">EDIT TASK:</div>
          <div className="task-form__title__task-id"> {task.id} </div>
        </div>
        <TextField
          required
          label="Title"
          variant="outlined"
          value={task.title}
          name="title"
          className="task-form__input-text"
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          required
          multiline
          type="text"
          value={task.description}
          name="description"
          label="Description"
          className="task-form__input-text"
          onChange={handleInputChange}
          margin="normal"
        />
        {/* <input
        type="text"
        value={task.title}
        name="title"
        placeholder="Add title.."
        className="task-form__input-text"
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        value={task.description}
        name="description"
        placeholder="Add description.."
        className="task-form__input-text"
        onChange={handleInputChange}
      ></input> */}
        <select
          name="priority"
          className="task-form__input-text"
          value={task.priority}
          onChange={handleInputChange}
        >
          <option value="1">High</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </select>
        <LoadingButton
          variant="contained"
          className="task-form__submit-button"
          onClick={handleSubmit}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Update
        </LoadingButton>
        {status?.type === "warning" &&
          displayMeesageAlert("warning", "You must fill in all of the inputs")}

        {status?.type === "success" &&
          displayMeesageAlert("success", "Task successfully added")}
      </div>
    </>
  );
};

EditTask.propTypes = {
  tasksList: PropTypes.array,
  setTasksList: PropTypes.func,
};

export default EditTask;
