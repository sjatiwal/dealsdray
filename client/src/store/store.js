import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import { userReducer } from "../reducer/userReducer";
import {
  employeeReducer,
  employeeDetailsReducer,
  deleteUpdateEmployeeReducer,
} from "../reducer/employeeReducer";

const reducers = combineReducers({
  user: userReducer,
  employees: employeeReducer,
  employee: employeeDetailsReducer,
  update: deleteUpdateEmployeeReducer,
});
const middleWare = [thunk];
const store = configureStore(
  { reducer: reducers },
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
