import moment from "moment";

//Reducer = a simple function with 2 args: state & action.
//Returns the new state based on the current state and the provided action

import {
  LOAD_TASKS_LIST,
  ADD_TASK,
  DELETE_TASK,
  CHANGE_TASK_STATUS,
  FILTER_TASKS_BY_STATUS,
} from "./actionTypes";

const initialState = {
  tasksList: [],
};

const taskListReducer = (state = initialState.tasksList, action) => {
  switch (action.type) {
    case LOAD_TASKS_LIST:
      return [...action.tasksList];

    case ADD_TASK:
      return [...state, action.task];

    case DELETE_TASK:
      return state.filter((task) => task.id !== action.id);

    case CHANGE_TASK_STATUS:
      return state.map((task) =>
        task.id === action.id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: moment().format("lll"),
            }
          : task
      );

    case FILTER_TASKS_BY_STATUS:
      switch (action.filter) {
        case "ALL":
          return action.tasksList;
        case "COMPLETED":
          return action.tasksList.filter((task) => task.completed);
        case "UNCOMPLETED":
          return action.tasksList.filter((task) => !task.completed);
        default:
          return action.tasksList;
      }

    default:
      return state;
  }
};

export default taskListReducer;
