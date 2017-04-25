import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';

import reducers from './reducers';
import apiMiddleware from './utils/apiMiddleware';

export default function() {
  return createStore(
    combineReducers(reducers),
    applyMiddleware(apiMiddleware, thunk)
  );
}
