import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTasksList, updateTask } from "../../service";
import { useSelector } from "react-redux";
import UserMessage from "../UserMeesage/UserMessage";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./EditTask.scss";

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

const PRIORITIES = [
  {
    value: 1,
    label: "High",
  },
  {
    value: 2,
    label: "Medium",
  },
  {
    value: 3,
    label: "Low",
  },
];

const EditTask = () => {
  const [task, setTask] = useState(DEFAULT_TASK);
  const [status, setStatus] = useState();
  const [openAlert, setOpenAlert] = useState(true);
  const [loading, setLoading] = useState(false);
  const { taskId } = useParams();
  const navigate = useNavigate();
  const tasksList = useSelector((state) => state.tasksList);

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
          name="title"
          value={task.title}
          onChange={handleInputChange}
          className="task-form__input-text"
          margin="normal"
          multiline
        />
        <TextField
          label="Description"
          required
          name="description"
          value={task.description}
          onChange={handleInputChange}
          className="task-form__input-text"
          margin="normal"
          multiline
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="select-priority">Priority</InputLabel>
          <Select
            label="Priority"
            labelId="select-priority"
            value={task.priority}
            name="priority"
            onChange={handleInputChange}
          >
            {PRIORITIES.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <LoadingButton
          variant="contained"
          className="task-form__submit-button"
          onClick={handleSubmit}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          margin="small"
        >
          Update
        </LoadingButton>

        {status?.type === "warning" && (
          <UserMessage
            type={status.type}
            message={"You must fill in all of the inputs"}
            openAlert={openAlert}
            setOpenAlert={setOpenAlert}
          ></UserMessage>
        )}

        {status?.type === "error" && (
          <UserMessage
            type={status.type}
            message={"Task couldn't be updated"}
            openAlert={openAlert}
            setOpenAlert={setOpenAlert}
          ></UserMessage>
        )}

        {status?.type === "success" && (
          <UserMessage
            type={status.type}
            message={"Task successfully updated"}
            openAlert={openAlert}
            setOpenAlert={setOpenAlert}
          ></UserMessage>
        )}
      </div>
    </>
  );
};

EditTask.propTypes = {
  tasksList: PropTypes.array,
  setTasksList: PropTypes.func,
};

export default EditTask;
