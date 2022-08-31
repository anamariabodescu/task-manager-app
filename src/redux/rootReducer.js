//in large apps there will be more than one reducers
//...in that cases you need to combine them as a single reducer which call it root reducer
//...using built-in combineReducers function of Redux

import { combineReducers } from "redux";
import taskListReducer from "./tasksListReducer";

const rootReducer = combineReducers({
  tasksList: taskListReducer,
});

export default rootReducer;
