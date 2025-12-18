// component/redux/UserReducer.js
import { SET_USERS } from "./Constants";

const initialState = []; // users = array

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.data || [];
    default:
      return state;
  }
}
