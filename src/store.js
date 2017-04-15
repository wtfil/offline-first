import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';

import reducers from './reducers';
import apiMiddleware from './utils/apiMiddleware';

export default createStore(
  combineReducers(reducers),
  applyMiddleware(apiMiddleware, thunk)
);
