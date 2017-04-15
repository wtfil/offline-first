import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';

import reducers from './reducers';

export default createStore(
  combineReducers(reducers),
  applyMiddleware(thunk)
);
