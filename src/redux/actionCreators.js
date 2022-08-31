import {
  LOAD_TASKS_LIST,
  ADD_TASK,
  DELETE_TASK,
  CHANGE_TASK_STATUS,
  FILTER_TASKS_BY_STATUS,
} from "./actionTypes";

export const loadTasksList = (tasksList) => {
  return { type: LOAD_TASKS_LIST, tasksList: tasksList };
};

export const addTask = (newTask) => {
  return { type: ADD_TASK, task: newTask };
};

export const deleteTask = (id) => {
  return { type: DELETE_TASK, id: id };
};

export const changeTaskStatus = (id) => {
  return { type: CHANGE_TASK_STATUS, id: id };
};

export const filterTasksByStatus = (tasksList, status) => {
  return { type: FILTER_TASKS_BY_STATUS, tasksList: tasksList, filter: status };
};
