import React, { lazy } from 'react';

import { render } from 'react-dom';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Home from './screens/home';
import Async from './components/async';

import 'sanitize.css';
import './styles/app.scss';

const Random = lazy(() => import(/* webpackChunkName: "random" */ './screens/random'));

render(
  (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/other" component={Async(Random)} />
      </Switch>
    </Router>
  ),
  document.getElementById('application-container'),
);
