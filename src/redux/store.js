//redux store is an object in which the state of the app is stored
//The main benefit of the store for components is that parents don’t need to pass the state (data) via props to child components
// eslint-disable-next-line no-underscore-dangle

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
//pass the reducer to the configure store

export default function configureStore() {
  return createStore(rootReducer, enhancer);
}
