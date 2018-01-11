import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


import rootReducer from './reducers/index'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import fetchFlowMiddleware from './middleware/fetchFlow'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
