import {configureStore} from '@reduxjs/toolkit';
import RootReducer from './RootReducer'
const store = configureStore({
  reducer:RootReducer
})

export default store;



// import { configureStore } from "@reduxjs/toolkit";
// import createSagaMiddleware from "redux-saga";
// import rootReducer from "./RootReducer";
// import SagaData from "./Saga";

// const sagaMiddleware = createSagaMiddleware();

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
// });

// sagaMiddleware.run(SagaData);

// export default store;
