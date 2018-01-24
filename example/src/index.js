import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import rootReducer from "./reducer";
import {Provider} from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { fetchFlowMiddleware } from "redux-fetch-flow";
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

let store = createStore(rootReducer, applyMiddleware(fetchFlowMiddleware, sagaMiddleware));

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
