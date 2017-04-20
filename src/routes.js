import React from 'react';
import {Route} from 'react-router';

import Layout from './containers/Layout';
import Search from './containers/Search';
import Repository from './containers/Repository';

export default (
  <Layout>
    <Route exact path='/' component={Search}/>
    <Route path='/:user/:repo' component={Repository}/>
  </Layout>
)
