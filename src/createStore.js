import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';

import reducers from './reducers';
import apiMiddleware from './utils/apiMiddleware';
import retryMiddleware from './utils/retryMiddleware';

export default function() {
  return createStore(
    combineReducers(reducers),
    applyMiddleware(retryMiddleware, apiMiddleware, thunk)
  );
}
