// component/redux/RootReducer.js
import { combineReducers } from "redux";
import { reducer } from "./Reducer";     // cart
import userReducer from "./UserReducer"; // users

export default combineReducers({
  reducer,   // cart array -> state.reducer
  users: userReducer, // users array -> state.users
});
