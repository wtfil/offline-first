import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import store from './store';

const root = (
  <Provider store={store}>
    <App/>
  </Provider>
)

render(root, document.querySelector('[data-app]'));
