// component/redux/Saga.js
import { takeEvery, put } from "redux-saga/effects";
import { GET_USERS, SET_USERS } from "./Constants";

function* getUsersSaga() {
  try {
    const response = yield fetch("https://jsonplaceholder.typicode.com/users");
    const data = yield response.json();
    yield put({ type: SET_USERS, data });
  } catch (e) {
    console.log("API Error:", e);
    yield put({ type: SET_USERS, data: [] });
  }
}

export default function* rootSaga() {
  yield takeEvery(GET_USERS, getUsersSaga);
}
