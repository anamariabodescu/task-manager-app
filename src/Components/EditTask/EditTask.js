import React, { useState, useEffect, useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { getTasksList, updateTask } from "../../service";
import { ThemeContext } from "../../context/ThemeContext";

import UserMessage from "../UserMeesage/UserMessage";
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
  const { darkMode } = useContext(ThemeContext);

  const navigate = useNavigate();
  const tasksList = useSelector((state) => state.tasksList);

  const themeStyles = useMemo(() => {
    return {
      textField: {
        "& label": {
          color: darkMode ? "hsl(0,0%,80%)" : "hsl(0,0%,10%)",
        },
        "& textArea": {
          color: darkMode ? "hsl(0,0%,90%)" : "hsl(0,0%,0%)",
        },
      },
      inputLabel: {
        color: darkMode ? "hsl(0,0%,80%)" : "hsl(0,0%,10%)",
      },
      select: {
        color: darkMode ? "hsl(0,0%,90%)" : "hsl(0,0%,0%)",
      },
    };
  }, [darkMode]);

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
          sx={themeStyles.textField}
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
          sx={themeStyles.textField}
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
          <InputLabel sx={themeStyles.inputLabel} id="select-priority">
            Priority
          </InputLabel>
          <Select
            label="Priority"
            labelId="select-priority"
            value={task.priority}
            name="priority"
            onChange={handleInputChange}
            sx={themeStyles.select}
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
