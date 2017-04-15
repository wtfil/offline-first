import React from 'react';
import {Route} from 'react-router';

import Search from './containers/Search';

export default (
  <Route>
    <Route path='/' component={Search}/>
  </Route>
)
