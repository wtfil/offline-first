import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import createStore from './createStore';
import routes from './routes';
import initServiceWorker from 'utils/initServiceWorker';
import initOnlineOfflineEvents from 'utils/initOnlineOfflineEvents';

const store = createStore();
initServiceWorker();
initOnlineOfflineEvents(store);

const root = (
  <Provider store={store}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>
)

render(root, document.querySelector('[data-app]'));
