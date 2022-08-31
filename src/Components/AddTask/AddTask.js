import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import moment from "moment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import UserMessage from "../UserMeesage/UserMessage";
import "./AddTask.scss";

import { createTask } from "../../service";
import { addTask } from "../../redux/actionCreators";
import { useDispatch } from "react-redux";

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

const AddTask = () => {
  const [task, setTask] = useState(DEFAULT_TASK);
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);
  const [status, setStatus] = useState();

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setOpenAlert(true);
    setLoading(true);
    setStatus();

    if (task.title && task.description && task.priority) {
      const newTask = {
        id: uuidv4(),
        createdAt: moment().format("lll"),
        createdBy: "Ana",
        title: task.title,
        description: task.description,
        priority: task.priority,
        completed: false,
        completedAt: null,
      };

      createTask(newTask)
        .then(() => dispatch(addTask(newTask)))
        .then(() => setStatus({ type: "success" }))
        .then(() => setLoading(false))
        .catch((error) => {
          setOpenAlert(true);
          setLoading(false);
          setStatus({ type: "error" });
        });

      setTask({ title: "", description: "", priority: "" });
    } else {
      setStatus({ type: "warning" });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="task-form">
        <h2 className="task-form__form-title">ADD NEW TASK</h2>

        <TextField
          label="Title"
          required
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
            name="priority"
            value={task.priority}
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
          className="task-form__submit-button"
          onClick={handleSubmit}
          loading={loading}
          loadingPosition="end"
          endIcon={<SendIcon />}
          variant="contained"
          margin="small"
        >
          Add
        </LoadingButton>
      </div>

      {status?.type === "warning" && (
        <UserMessage
          type={status.type}
          message={"You must fill in all of the inputs"}
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
        ></UserMessage>
      )}

      {status?.type === "success" && (
        <UserMessage
          type={status.type}
          message={"Task successfully added"}
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
        ></UserMessage>
      )}

      {status?.type === "error" && (
        <UserMessage
          type={status.type}
          message={"Task couldn't be added"}
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
        ></UserMessage>
      )}
    </>
  );
};

AddTask.propTypes = {
  tasksList: PropTypes.array,
  setTasksList: PropTypes.func,
};

export default AddTask;
