import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { HomeContainer, AddContainer } from 'containers';
import { Layout } from 'components';

const routes = (
  <Router history={hashHistory}>
    <Route component={Layout} path="/">
      <IndexRoute component={HomeContainer} />
      <Route path="add" component={AddContainer} />
    </Route>
  </Router>
);

export default routes;
