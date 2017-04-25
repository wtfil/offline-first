import React from 'react';
import {Route, Switch} from 'react-router';

import Layout from './containers/Layout';
import Search from './containers/Search';
import SaveGithubToken from './containers/SaveGithubToken';
import Repository from './containers/Repository';
import NotFound from './containers/NotFound';

export default (
  <Layout>
    <Switch>
      <Route exact path='/' component={Search}/>
      <Route path='/save-token' component={SaveGithubToken}/>
      <Route path='/:user/:repo' component={Repository}/>
      <Route component={NotFound}/>
    </Switch>
  </Layout>
)
