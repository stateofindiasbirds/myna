import { combineReducers } from "redux";
import { UserReducer } from "./index";

const rootReducer = combineReducers({
  UserReducer: UserReducer,
});

export default rootReducer;
